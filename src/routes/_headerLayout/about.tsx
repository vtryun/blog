import { createFileRoute } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import prisma from '@/lib/prisma';

const getUsers = createServerFn().handler(async () => {
  const res = await prisma.user.findMany();
  return res;
});

export const Route = createFileRoute('/_headerLayout/about')({
  component: RouteComponent,
  loader: () => getUsers(),
});

function RouteComponent() {
  const users = Route.useLoaderData();
  return (
    <div>
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </div>
  );
}
