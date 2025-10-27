import { INITIAL_VALUE } from '@/features/richtext/constants/initvalue';
import prisma from '@/lib/prisma';
import PostShow from '@/features/richtext/components/post-show';
import { Box, Container } from '@mui/material';

export default async function PostPage({
  params: paramsPromise,
}: {
  params: Promise<{ slug: string }>;
}) {
  const params = await paramsPromise;
  const post = await prisma.post.findUnique({
    where: { slug: params.slug },
  });

  console.log(post);

  if (!post)
    return (
      <div className="flex h-screen items-center justify-center">
        <h1>404 Not Found</h1>
      </div>
    );

  const content = Array.isArray(post.content) ? post.content : INITIAL_VALUE;

  return (
    <Container>
      <Box sx={{mt:15}}>
        <PostShow content={content} />
      </Box>
    </Container>
  );
}
