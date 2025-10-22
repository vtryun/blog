import { Link as MuiLink } from '@mui/material';
import Link from 'next/link';
import Stack from '@mui/material/Stack';
import { grey } from '@mui/material/colors';

const NAV_LINKS = [
  { label: 'login', href: '/auth' },
  { label: 'dashboard', href: '/dashboard' },
];

export default function NavLink() {
  return (
    <Stack
      component="nav"
      direction="row"
      sx={{
        justifyContent: 'space-around',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        py: 1.5,
        boxShadow: 1,
        bgcolor: 'white',
        zIndex: 1000,
      }}
    >
      <Stack>
        <MuiLink
          component={Link}
          underline="none"
          color="black"
          href="/"
          sx={{ fontSize: 20, fontWeight: 600 }}
        >
          avatarYun
        </MuiLink>
      </Stack>
      <Stack direction="row" gap={6}>
        {NAV_LINKS.map((link) => (
          <MuiLink
            key={link.href}
            component={Link}
            underline="hover"
            href={link.href}
            sx={{ color: grey[500], '&:hover': { color: grey[900] } }}
          >
            {link.label}
          </MuiLink>
        ))}
      </Stack>
    </Stack>
  );
}
