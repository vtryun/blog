import { createFileRoute, useRouter } from '@tanstack/react-router';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { signUp } from '@/lib/auth-client';
import Stack from '@mui/material/Stack';
import { useSnackbar } from '@/share/hooks/use-snackbar';
import Box from '@mui/material/Box';
import { blue, common } from '@mui/material/colors';
import { CustomLink } from '@/share/components/custom-link';

export const Route = createFileRoute('/sign-up')({
  component: RouteComponent,
});

function RouteComponent() {
  return <LogupForm />;
}

export default function LogupForm({
  callbackUrl = '/',
}: {
  callbackUrl?: string;
}) {
  const router = useRouter();
  const { showSnackbar } = useSnackbar();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);

    const res = await signUp.email({
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    });

    if (res.error) {
      setError(res.error.message || 'Something went wrong.');
      showSnackbar('wrong', 'error');
    } else {
      router.navigate({ to: '/' });
    }
  }

  return (
    // <>
    //   <Stack component="form" onSubmit={handleSubmit} gap={2}>
    //     <Typography variant="h5" component="h2" align="center">
    //       Register
    //     </Typography>

    // <TextField
    //   name="name"
    //   label="Name"
    //   placeholder="Name"
    //   required
    //   fullWidth
    // />

    // <TextField
    //   name="email"
    //   label="Email"
    //   placeholder="Email"
    //   required
    //   fullWidth
    // />

    // <TextField
    //   name="password"
    //   label="Password"
    //   type="password"
    //   placeholder="Password"
    //   required
    //   fullWidth
    // />
    // {error}

    // <Button type="submit" variant="contained" color="primary">
    //   submit
    // </Button>
    //   </Stack>
    // </>
    <Box sx={{ height: '100vh' }}>
      <Stack direction="row" height="100%">
        <Box
          flex={1}
          flexBasis="60%"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Stack
            component="form"
            onSubmit={handleSubmit}
            gap={2}
            sx={{ maxWidth: 600, minWidth: 500, p: 4 }}
          >
            <Typography variant="h5" component="h2">
              Welcome
            </Typography>
            <Typography variant="caption">
              record your thoughts, write them down
            </Typography>

            <TextField
              name="name"
              label="Name"
              placeholder="Name"
              type="text"
              required
              fullWidth
            />

            <TextField
              name="email"
              label="Email"
              placeholder="Email"
              type="email"
              required
              fullWidth
            />

            <TextField
              name="password"
              label="Password"
              type="password"
              placeholder="Password"
              required
              fullWidth
            />
            {error}

            <Button type="submit" variant="contained" color="primary">
              submit
            </Button>

            <Stack direction="row" spacing={1} justifyContent="center">
              <Typography>Do you have an account?</Typography>
              <CustomLink to="/login" underline="hover" color={common.black}>
                login
              </CustomLink>
            </Stack>
          </Stack>
        </Box>

        <Box flex={1} flexBasis="40%" bgcolor={blue[500]}></Box>
      </Stack>
    </Box>
  );
}
