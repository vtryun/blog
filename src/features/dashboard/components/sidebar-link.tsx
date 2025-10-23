import HomeFilledIcon from '@mui/icons-material/HomeFilled';
import AddBoxIcon from '@mui/icons-material/AddBox';
import SettingsIcon from '@mui/icons-material/Settings';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { grey } from '@mui/material/colors';
import SignOut from '@/features/auth/components/signout';

const SIDEBAR_LINKS = [
  { label: 'Home', href: '/', icon: <HomeFilledIcon /> },
  { label: 'New post', href: '/post/edit', icon: <AddBoxIcon /> },
  { label: 'Settings', href: '/settings', icon: <SettingsIcon /> },
];

export default function SidebarLinks() {
  return (
    <Stack spacing={1}>
      {SIDEBAR_LINKS.map((link) => (
        <Button
          key={link.href}
          component={Link}
          href={link.href}
          startIcon={link.icon}
          size="large"
          sx={{
            textWrap: 'nowrap',
            textTransform: 'none',
            color: grey[500],
            justifyContent: 'flex-start',
            borderRadius: 10,
            '&:hover': { color: grey[900], bgcolor: grey[200] },
          }}
        >
          {link.label}
        </Button>
      ))}
      <SignOut />
    </Stack>
  );
}
