import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Harmonia',
  description:
    'A workspace application aiming to help people organize their ideas.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Harmonia</title>
        <meta name="description" content="Research. Create. Note. Sync" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased grid-background bg-slate-100 h-[100vh] flex justify-center items-center flex-col`}
      >
        {children}
      </body>
    </html>
  );
}
