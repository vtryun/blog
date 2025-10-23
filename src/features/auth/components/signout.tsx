'use client';

import { signOut } from '@/lib/auth-client';
import Button from '@mui/material/Button';
import { grey } from '@mui/material/colors';
import { useRouter } from 'next/navigation';
import LogoutIcon from '@mui/icons-material/Logout';

export default function SignOut() {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <Button
      onClick={handleSignOut}
      startIcon={<LogoutIcon />}
      size="large"
      sx={{
        textTransform: 'none',
        color: grey[500],
        justifyContent: 'flex-start',
        borderRadius: 10,
        '&:hover': { color: grey[900], bgcolor: grey[200] },
      }}
    >
      Sign out
    </Button>
  );
}
