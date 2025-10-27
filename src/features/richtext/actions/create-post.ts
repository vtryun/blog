"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { nanoid } from "nanoid";
import slugify from "slugify";

export interface CreatePostParams {
  title: string;
  content: any[] | null;
  excerpt?: string;
  coverImage?: string;
  categoryId?: string;
  categoryName?: string;
  tagIds?: string[];
  tagNames?: string[];
  status?: "DRAFT" | "PUBLISHED";
}

export async function createPost(params: CreatePostParams) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const authorId = session.user.id;
  const {
    title,
    content,
    excerpt,
    coverImage,
    categoryId,
    categoryName,
    tagIds = [],
    tagNames = [],
    status = "PUBLISHED",
  } = params;

  if (!title || !content) {
    throw new Error("title and content are required.");
  }

  // const slug = slugify(`${title}-${nanoid(8)}`, { lower: true, strict: true });
  const slug = slugify(title, { lower: true, strict: true })

  const existingPost = await prisma.post.findUnique({
    where: { slug },
  });

  if (existingPost) {
    throw new Error(`Duplicate slug: ${slug}. Please change the title.`);
  }

  return await prisma.$transaction(async (tx) => {
    let categoryConnect;
    if (categoryId) {
      categoryConnect = { connect: { id: categoryId } };
    } else if (categoryName) {
      const category = await tx.category.upsert({
        where: { name: categoryName },
        update: {},
        create: { name: categoryName },
      });
      categoryConnect = { connect: { id: category.id } };
    }

    const tagConnects = [];
    if (tagIds.length > 0) {
      tagConnects.push(...tagIds.map((id) => ({ id })));
    }
    if (tagNames.length > 0) {
      const tagRecords = await Promise.all(
        tagNames.map((name) =>
          tx.tag.upsert({
            where: { name },
            update: {},
            create: { name },
          })
        )
      );
      tagConnects.push(...tagRecords.map((t) => ({ id: t.id })));
    }

    const post = await tx.post.create({
      data: {
        title,
        slug,
        content,
        excerpt,
        coverImage,
        status,
        author: { connect: { id: authorId } },
        category: categoryConnect,
        tags: tagConnects.length > 0 ? { connect: tagConnects } : undefined,
      },
      include: { author: true, tags: true, category: true },
    });

    return post;
  });
}
