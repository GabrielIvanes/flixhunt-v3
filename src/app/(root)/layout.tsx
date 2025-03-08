import type { Metadata } from 'next';
import '../globals.css';
import Navbar from '@/components/layout/navbar';
import { ThemeProvider } from '@/components/theme-provider';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { Lexend, Montserrat, Rubik } from 'next/font/google';
import { getTmdbConfiguration } from '@/lib/tmdb-config-functions';
import { TmdbProvider } from '@/context/tmdb-context';

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

  const configuration = await getTmdbConfiguration();

  return (
    user &&
    configuration && (
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
            <TmdbProvider value={configuration}>
              <header className="backdrop-blur-lg sticky top-0 pt-5 z-10">
                <Navbar user={user} />
              </header>
              <main className="flex min-h-[calc(100vh-4rem-1.25rem)] mt-5 max-w-full flex-col items-center justify-center">
                {children}
              </main>
            </TmdbProvider>
          </ThemeProvider>
        </body>
      </html>
    )
  );
}
