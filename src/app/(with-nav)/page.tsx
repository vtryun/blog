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
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

export default async function HomePage() {
  const posts = await prisma.post.findMany({
    select: {
      title: true,
      slug: true,
      createdAt: true,
      // author: true,
    },
    where: {
      status: PostStatus.PUBLISHED,
    },
  });

  return (
    <Box sx={{ height: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Stack gap={3} mt={10}>
          {posts.map((post) => (
            <Stack key={post.slug} gap={0.5}>
              <MuiLink
                component={Link}
                href={`/post/${post.slug}`}
                underline="hover"
              >
                {/* title */}
                <Typography color="black" fontSize={24} fontWeight={300}>
                  {post.title}
                </Typography>
              </MuiLink>
              <Stack direction="row" gap={2} alignItems="center">
                {/* <Stack direction="row" alignItems="center" gap={0.5}>
                <PersonOutlineIcon
                  sx={{
                    color: grey[500],
                    width: 16,
                    height: 16,
                  }}
                />

                <MuiLink
                  component={Link}
                  variant="body2"
                  underline="hover"
                  sx={{ color: 'black', fontWeight: 400 }}
                  href={`/${post.author.name}`}
                >
                  {post.author.name}
                </MuiLink>
              </Stack> */}

                <Stack direction="row" alignItems="center" gap={0.5}>
                  <AccessTimeIcon
                    sx={{
                      color: grey[500],
                      width: 16,
                      height: 16,
                    }}
                  />
                  <Typography variant="caption">
                    {format(post.createdAt, 'yyyy-MM-dd HH:mm:ss')}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
