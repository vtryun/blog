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
import { Divider } from '@mui/material';
import { grey } from '@mui/material/colors';

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

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Container fixed sx={{ flex: 1, display: 'flex', p: 0 }}>
        <Stack sx={{ pr: 4 }}>
          <Box sx={{ position: 'sticky', top: 350 }}>
            <SidebarLinks />
          </Box>
        </Stack>
        <Stack
          flex={1}
          sx={{
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderTopWidth: 0,
            borderBottom: 0,
            borderStyle: 'solid',
            borderColor: grey[100],
          }}
        >
          <Stack direction="row" mt={3}>
            <Stack sx={{ flex: 1,  }}>
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

              <Stack mt={6} pl={2} justifyContent="center">
                <Stack direction="row" alignItems="center" gap={1}>
                  <Typography variant="h6">{user.name}</Typography>
                  <Stack direction="row" alignItems="center" gap={1}>
                    <Stack direction="row" alignItems="center">
                      <Typography variant="body2">followers</Typography>
                      <Typography fontWeight={500}>123</Typography>
                    </Stack>
                    <Divider orientation="vertical" flexItem />
                    <Stack direction="row" alignItems="center">
                      <Typography variant="body2">following</Typography>
                      <Typography fontWeight={500}>123</Typography>
                    </Stack>
                  </Stack>
                </Stack>
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
