import Header from '@/share/components/header';
import Box from '@mui/material/Box';
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_headerLayout')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Box>
      <Header />
      <Outlet />
    </Box>
  );
}
