import prisma from '@/lib/prisma';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { PostStatus } from '@prisma/client';

export default async function HomePage() {
  const posts = await prisma.post.findMany({
    select: {
      title: true,
      slug: true,
      createdAt: true,
    },
    where: {
      status: PostStatus.PUBLISHED,
    },
  });

  console.log(posts);
  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <pre>{JSON.stringify(posts, null, 2)}</pre>
    </Box>
  );
}
