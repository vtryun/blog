import RichtextEditor from '@/features/richtext/components/richtext-editor';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export default async function CreatePostPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return <div>Not authenticated</div>;
  }
  return <RichtextEditor mode="create" />;
}
