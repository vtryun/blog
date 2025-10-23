import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { headers } from 'next/headers';
import Avatar from '@mui/material/Avatar';
import SidebarLinks from '@/features/dashboard/components/sidebar-link';
import { format } from 'date-fns';
import PageTabs from '@/features/dashboard/components/pages-tabs';

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return <div>Not authenticated</div>;
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { posts: true },
  });

  if (!user) {
    return <div>User not found</div>;
  }

  const rows = user.posts.map((post) => ({
    ...post,
    createdAt:
      post.createdAt instanceof Date
        ? format(post.createdAt, 'yyyy-MM-dd HH:mm:ss')
        : String(post.createdAt),
  }));

  console.log(user);

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Container fixed sx={{ pt: 2, flex: 1, display: 'flex' }}>
        <Stack sx={{ pr: 4 }}>
          <Box position="sticky" top={360}>
            <SidebarLinks />
          </Box>
        </Stack>
        <Stack flex={1}>
          <Stack direction="row" mt={3}>
            <Stack sx={{ flex: 1, p: 2 }}>
              <Box
                component={'img'}
                src={'600x200.jpg'}
                sx={{ height: 200, objectFit: 'cover' }}
              />
              <Box position="relative">
                <Avatar
                  src="avatar.jpg"
                  sx={{
                    width: 80,
                    height: 80,
                    position: 'absolute',
                    top: 0,
                    transform: 'translate(16px, -50%)',
                  }}
                />
              </Box>

              <Stack mt={6} pl={2}>
                <Typography variant="h6">{user.name}</Typography>
                <Typography variant="body2">{user.bio}</Typography>
              </Stack>
              <PageTabs posts={user.posts} />
            </Stack>
          </Stack>
        </Stack>
        <Stack width={200}>
          <Box>Notificaions</Box>
        </Stack>
      </Container>
    </Box>
  );
}
