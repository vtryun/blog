'use client';

import { signOut } from '@/lib/auth-client';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';

export default function SignOut() {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  return <Button onClick={handleSignOut}>Sign out</Button>;
}