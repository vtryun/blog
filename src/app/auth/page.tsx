import AuthTabs from '@/features/auth/components/auth-tabs';

export default async function AuthPage(props: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const searchParams = await props.searchParams;
  const callbackUrl = searchParams.callbackUrl ?? "";

  return (
    <>
      <AuthTabs callbackUrl={callbackUrl}/>
    </>
  );
}
