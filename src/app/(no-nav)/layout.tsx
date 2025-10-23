import Box from '@mui/material/Box';

export default function NoNavLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Box>{children}</Box>;
}
