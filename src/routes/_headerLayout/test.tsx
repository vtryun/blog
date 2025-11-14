import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { createFileRoute } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';

const getC = createServerFn({ method: 'POST' })
  .inputValidator((data: { hi: string }) => data)
  .handler(async (ctx: any) => {
    const cookie = ctx.request.headers.get('cookie');
    console.log(cookie);
  });

export const Route = createFileRoute('/_headerLayout/test')({
  // loader: () => getC(),
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Box>
      <Button onClick={() => getC({ data: { hi: '123' } })}>hi</Button>{' '}
    </Box>
  );
}
