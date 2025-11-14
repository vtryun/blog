import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_headerLayout/document')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/doucument"!</div>
}
