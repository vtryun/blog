"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
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
    headers: await headers()
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
    tagIds = [],
    status = "DRAFT",
  } = params;

  if (!title || !content) {
    throw new Error("title and content are required.");
  }

  const slug = slugify(`${title}-${authorId}`);
  const existingPost = await prisma.post.findUnique({
    where: { slug },
  });

  if (existingPost) {
    throw new Error(`The slug generated from the title already exists. Please modify the title or specify a slug manually. Duplicate slug: ${slug}`);
  }

  const post = await prisma.post.create({
    data: {
      title,
      slug,
      content,
      excerpt,
      coverImage,
      status,
      author: { connect: { id: authorId } },
      category: categoryId ? { connect: { id: categoryId } } : undefined,
      tags:
        tagIds.length > 0
          ? { connect: tagIds.map((id) => ({ id })) }
          : undefined,
    },
    include: {
      author: true,
      tags: true,
      category: true,
    },
  });

  return post;
}
