"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";

export interface EditPostParams {
  title: string;
  content: any[] | null;
  excerpt?: string;
  coverImage?: string;
  categoryId?: string;
  categoryName?: string;
  tagIds?: string[];
  tagNames?: string[];
  status?: "DRAFT" | "PUBLISHED" ;
  slug?: string; // 允许通过 slug 定位文章
}

export async function editPost(params: EditPostParams) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const authorId = session.user.id;
  const {
    slug,
    title,
    content,
    excerpt,
    coverImage,
    categoryId,
    categoryName,
    tagIds = [],
    tagNames = [],
    status,
  } = params;

  if (!title || !content) {
    throw new Error("title and content are required.");
  }

  if (!slug) {
    throw new Error("slug is required for editing post.");
  }

  // 查找现有文章
  const existingPost = await prisma.post.findUnique({
    where: { slug },
  });

  if (!existingPost) {
    throw new Error("Post not found.");
  }

  // 检查作者权限
  if (existingPost.authorId !== authorId) {
    throw new Error("You do not have permission to edit this post.");
  }

  return await prisma.$transaction(async (tx) => {
    // 分类
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

    // 标签
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
      tagConnects.push(...tagRecords.map((tag) => ({ id: tag.id })));
    }

    // 更新文章
    const updatedPost = await tx.post.update({
      where: { slug },
      data: {
        title,
        content,
        excerpt,
        coverImage,
        status,
        category: categoryConnect,
        tags: {
          set: [], // 先清空旧标签再连接新标签
          connect: tagConnects,
        },
      },
      include: { author: true, tags: true, category: true },
    });

    return updatedPost;
  });
}
