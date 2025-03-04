import { auth } from '@/auth';
import SignOut from '@/components/auth/sign-out';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await auth();

  if (!session) return redirect('/login');

  return (
    <div>
      <p>Home page</p>
      <SignOut />
    </div>
  );
}
