import { auth, signIn } from '@/auth';
import { redirect } from 'next/navigation';

interface Props {
  provider: string;
}

export default async function SignIn({ provider }: Props) {
  const session = await auth();

  if (session) return redirect('/');

  return (
    <form
      action={async () => {
        'use server';
        await signIn(`${provider}`, { redirectTo: '/' });
      }}
    >
      <button type="submit">
        Signin with {provider.charAt(0).toUpperCase() + provider.slice(1)}
      </button>
    </form>
  );
}
