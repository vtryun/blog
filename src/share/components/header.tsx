import Stack from '@mui/material/Stack';
import { common } from '@mui/material/colors';
import Box from '@mui/material/Box';
import { CustomLink } from './custom-link';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { CustomButtonLink } from './custom-button-link';
import { signOut, useSession } from '@/lib/auth-client';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { useState, MouseEvent } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Typography from '@mui/material/Typography';

const GITHUB_LINK = 'https://github.com/vtryun';

type StyledCustomLinkProps = React.ComponentProps<typeof CustomLink>;

const StyledCustomLink: React.FC<StyledCustomLinkProps> = (props) => {
  return <CustomLink color={common.black} underline="hover" {...props} />;
};

export default function Header() {
  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch, //refetch the session
  } = useSession();

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    signOut();
    setAnchorElUser(null);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="sticky"
        sx={{
          bgcolor: common.white,
          boxShadow: 'none',
          borderBottom: '1px solid',
          borderColor: 'divider',
          top: 0,
        }}
      >
        <Toolbar>
          <Stack
            direction="row"
            justifyContent="space-around"
            alignItems="center"
            width="100%"
          >
            <StyledCustomLink to="/" sx={{ fontWeight: 600, fontSize: 26 }}>
              avatarYun
            </StyledCustomLink>
            <Stack direction="row" spacing={2}>
              <StyledCustomLink to="/blog">blog</StyledCustomLink>
              <StyledCustomLink to="/components">components</StyledCustomLink>
              <StyledCustomLink to="/document">document</StyledCustomLink>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              {session ? (
                <CustomButtonLink
                  to="/blog/create"
                  variant="outlined"
                  sx={{
                    bgcolor: common.white,
                    color: common.black,
                    boxShadow: 0,
                    borderRadius: 2,
                    borderColor: 'divider',
                    textTransform: 'capitalize',
                  }}
                >
                  create blog
                </CustomButtonLink>
              ) : null}
              {session ? (
                <Box>
                  <IconButton sx={{ p: 0 }} onClick={handleOpenUserMenu}>
                    <Avatar
                      src={session.user?.image ?? undefined}
                      alt="用户头像"
                    />
                  </IconButton>
                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem onClick={handleLogout}>
                      <Typography sx={{ textAlign: 'center' }}>
                        logout
                      </Typography>
                    </MenuItem>
                  </Menu>
                </Box>
              ) : (
                <CustomButtonLink
                  to="/login"
                  variant="contained"
                  sx={{ bgcolor: common.black, boxShadow: 0, borderRadius: 2 }}
                >
                  log in
                </CustomButtonLink>
              )}
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
