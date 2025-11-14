import { Stack, TextField, Button, Typography, Box } from '@mui/material';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { useState } from 'react';
import { signIn } from '@/lib/auth-client';
import { blue, common } from '@mui/material/colors';
import { CustomLink } from '@/share/components/custom-link';

export const Route = createFileRoute('/login')({
  component: RouteComponent,
});

function RouteComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data, error } = await signIn.email({
        email,
        password,
      });

      console.log({ data, error });

      if (error) {
        setError(error.message || 'An error occurred');
      } else {
        await router.navigate({ to: '/' });
      }
    } catch (err) {
      setError('Login failed. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ height: '100vh' }}>
      <Stack direction="row" height="100%">
        <Box flex={1} flexBasis="60%">
          <Stack
            height="100%"
            justifyContent="center"
            px={5}
            mx="auto"
            maxWidth={500}
            spacing={4}
          >
            <Box>
              <Typography variant="h5" component="h2">
                Welcome back
              </Typography>
              <Typography variant="caption">
                Log in to your account to continue.
              </Typography>
            </Box>
            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={2}>
                <TextField
                  name="email"
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  fullWidth
                />

                <TextField
                  name="password"
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  fullWidth
                />

                <Typography color="error" variant="body2" height={20}>
                  {error}
                </Typography>

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={loading}
                >
                  {loading ? 'Signing in...' : 'Sign In'}
                </Button>
              </Stack>
            </Box>
            <Stack direction="row" spacing={1} justifyContent="center">
              <Typography>Don't have an account?</Typography>
              <CustomLink to="/sign-up" underline="hover" color={common.black}>
                Sign up
              </CustomLink>
            </Stack>
          </Stack>
        </Box>
        <Box flex={1} flexBasis="40%" bgcolor={blue[600]}></Box>
      </Stack>
    </Box>
  );
}
