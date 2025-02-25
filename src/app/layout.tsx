import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Flixhunt',
  description: 'Flixhunt by Gabriel Ivanes',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
