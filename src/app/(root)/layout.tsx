import type { Metadata } from 'next';
import '../globals.css';
import Navbar from '@/components/layout/navbar';
import { ThemeProvider } from '@/components/theme-provider';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { Lexend, Montserrat, Rubik } from 'next/font/google';

export const metadata: Metadata = {
  title: 'Flixhunt',
  description: 'Flixhunt by Gabriel Ivanes',
};

const montserrat = Montserrat({
  weight: 'variable',
  subsets: ['latin'],
});

const rubik = Rubik({ weight: 'variable', subsets: ['latin'] });

const lexend = Lexend({ weight: 'variable', subsets: ['latin'] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (!session) return redirect('/login');

  const user = session?.user;

  return (
    user && (
      <html lang="en" suppressHydrationWarning>
        <body
          className={`text-foreground bg-background ${lexend.className} ${rubik.className} ${montserrat.className}`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar user={user} />
            {children}
          </ThemeProvider>
        </body>
      </html>
    )
  );
}
