import prisma from '@/lib/prisma';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { PostStatus } from '@prisma/client';
import MuiLink from '@mui/material/Link';
import Link from 'next/link';
import Stack from '@mui/material/Stack';
import { format } from 'date-fns';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { grey } from '@mui/material/colors';

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
        minHeight: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Stack gap={3}>
        {posts.map((post) => (
          <Stack key={post.slug} gap={0.5}>
            <MuiLink
              component={Link}
              href={`/post/${post.slug}`}
              underline="hover"
              color="black"
            >
              {post.title}
            </MuiLink>
            <Stack direction="row" gap={1} alignItems="center">
              <AccessTimeIcon
                sx={{
                  color: grey[500],
                  width: 20,
                  height: 20,
                }}
              />
              <Typography variant="caption">
                {format(post.createdAt, 'yyyy-MM-dd HH:mm:ss')}
              </Typography>
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}
