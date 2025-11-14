import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link } from '@tanstack/react-router';
import { CustomLink } from './custom-link';

export function NotFound({ children }: { children?: any }) {
  return (
    <Box>
      {children || <p>The page you are looking for does not exist.</p>}
      <Button onClick={() => window.history.back()}>back</Button>
      <CustomLink to="/">home</CustomLink>
    </Box>
  );
}
