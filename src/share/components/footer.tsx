import Box from '@mui/material/Box';
import { grey } from '@mui/material/colors';
import MuiLink from '@mui/material/Link';
import Link from 'next/link';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        display: 'flex',
        justifyContent: 'center',
        py: 4,
      }}
    >
      <MuiLink
        component={Link}
        href="https://beian.miit.gov.cn/"
        underline="hover"
        sx={{
           color:grey[500],
           "&:hover":{
             color:grey[800]
           }
        }}
      >
        赣ICP备2025074615号-1
      </MuiLink>
    </Box>
  );
}
