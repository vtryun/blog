import prisma from '@/lib/prisma';
import RichtextEditor from '@/features/richtext/components/richtext-editor';

interface EditPageProps {
  params: { slug: string };
}

export default async function EditPage({ params }: EditPageProps) {
  const { slug } = await params;

  const post = await prisma.post.findUnique({
    where: { slug: slug },
    include: { category: true, tags: true },
  });

  if (!post) {
    return <div>Post not found.</div>;
  }

  if (post.status === 'ARCHIVED') {
    return <div>the Post is archived, can't edit</div>;
  }

  return (
    <RichtextEditor
      mode="edit"
      slug={post.slug}
      title={post.title}
      content={post.content as any}
      categoryName={post.category?.name ?? ''}
      tagNames={post.tags.join('')}
      status={post.status}
    />
  );
}
