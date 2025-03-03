import SignIn from '@/components/sign-in';

function page() {
  return (
    <div>
      <SignIn provider="google" />
      <SignIn provider="github" />
    </div>
  );
}

export default page;
