import Box from '@mui/material/Box';
import NavLink from '@/share/components/nav-link';
import Footer from '@/share/components/footer';

export default function WithNavLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateRows: 'auto 1fr auto',
        minHeight: '100%',
      }}
    >
      <NavLink />
      <Box component="main">{children}</Box>
      <Footer />
    </Box>
  );
}
