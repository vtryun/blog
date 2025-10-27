import MuiLink from '@mui/material/Link';
import Link from 'next/link';
import Stack from '@mui/material/Stack';
import GitHubIcon from '@mui/icons-material/GitHub';
import { grey } from '@mui/material/colors';
import Box from '@mui/material/Box';

const GITHUB_LINK = 'https://github.com/vtryun';

export default function NavLink() {
  return (
    <Box component="header">
      <Stack
        component="nav"
        direction="row"
        sx={{
          justifyContent: 'space-around',
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          py: 4,
          borderBottomWidth: 1,
          borderBottomColor: 'divider',
          borderBottomStyle: 'solid',
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
          {/* {NAV_LINKS.map((link) => (
          <MuiLink
            key={link.href}
            component={Link}
            underline="hover"
            href={link.href}
            sx={{ color: grey[500], '&:hover': { color: grey[900] } }}
          >
            {link.label}
          </MuiLink>
        ))} */}
          <Link href={GITHUB_LINK}>
            <GitHubIcon
              sx={{
                cursor: 'pointer',
                color: grey[600],
                '&:hover': { color: grey[800] },
              }}
            />
          </Link>
        </Stack>
      </Stack>
    </Box>
  );
}
