import SignIn from '@/components/sign-in';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';

async function page() {
  const session = await auth();

  if (session) return redirect('/');
  return (
    <div>
      <SignIn provider="google" />
      <SignIn provider="github" />
    </div>
  );
}

export default page;
