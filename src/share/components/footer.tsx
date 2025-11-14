import Box from '@mui/material/Box';
import { grey } from '@mui/material/colors';
import MuiLink from '@mui/material/Link';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        py: 2,
        zIndex: 100,
        // bgcolor: 'white',
      }}
    >
      <MuiLink
        href="https://beian.miit.gov.cn/"
        target="_blank"
        underline="hover"
        sx={{
          color: grey[500],
          '&:hover': {
            color: grey[800],
          },
        }}
      >
        赣ICP备2025074615号-1
      </MuiLink>
    </Box>
  );
}
