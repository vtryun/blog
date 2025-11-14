import prisma from '@/lib/prisma';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { createFileRoute } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { format } from 'date-fns';
import { common, grey } from '@mui/material/colors';
import { CustomLink } from '@/share/components/custom-link';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const getSomeBlog = createServerFn().handler(async () => {
  const blogs = await prisma.post.findMany({
    where: {
      status: 'PUBLIC',
    },
    include: {
      tags: true,
      author: {
        select: {
          name: true,
          avatarUrl: true,
        },
      },
    },
    omit: {
      content: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return blogs;
});

export const Route = createFileRoute('/blog/')({
  component: RouteComponent,
  loader: () => getSomeBlog(),
});

function RouteComponent() {
  const blogs = Route.useLoaderData();

  return (
    <Container fixed sx={{ mt: 10 }}>
      <CustomLink
        to=".."
        sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 5 }}
      >
        <ArrowBackIosNewIcon sx={{ fontSize: 16 }} />
        back
      </CustomLink>
      <Stack spacing={4}>
        {blogs.map((blog) => (
          <Stack key={blog.id} direction="row" alignItems="center">
            <Typography sx={{ color: grey[500], fontSize: 14, width: 130 }}>
              {format(blog.createdAt, 'MMM do yyyy')}
            </Typography>

            <CustomLink
              to="/blog/$slug"
              underline="hover"
              sx={{ color: common.black, fontWeight: 500 }}
              params={{ slug: blog.slug }}
            >
              {blog.title}
            </CustomLink>
          </Stack>
        ))}
      </Stack>
    </Container>
  );
}
