import Box from '@mui/material/Box';
import NavLink from '@/share/components/nav-link';

export default function WithNavLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box>
      <NavLink />
      {children}
    </Box>
  );
}
