import { signIn } from '@/auth';

interface Props {
  provider: string;
}

export default async function SignIn({ provider }: Props) {
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
