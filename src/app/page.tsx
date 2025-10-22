import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default async function HomePage() {
  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography>avtyun blog</Typography>
    </Box>
  );
}
