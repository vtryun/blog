'use client';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from '@/lib/auth-client';
import Stack from '@mui/material/Stack';

export default function LoginForm({
  callbackUrl = '/',
}: {
  callbackUrl: string;
}) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);

    const res = await signIn.email({
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    });

    if (res.error) {
      setError(res.error.message || 'Something went wrong.');
    } else {
      router.push('/dashboard');
    }
  }

  return (
    <>
      <Stack
        component="form"
        onSubmit={handleSubmit}
        gap={2}
      >
        <Typography variant="h5" component="h2" align="center">
          SignIn
        </Typography>

        <TextField
          name="email"
          label="Email"
          placeholder="Email"
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
      </Stack>
    </>
  );
}
