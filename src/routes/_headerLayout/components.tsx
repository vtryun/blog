import TestCard from '@/share/components/test-card';
import Masonry from '@mui/lab/Masonry';
import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_headerLayout/components')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Box>
      <Container>
        <Masonry columns={3} spacing={2}>
          <Box>interesting components</Box>
        </Masonry>
        <TestCard>1</TestCard>
      </Container>
    </Box>
  );
}
