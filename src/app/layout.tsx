import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
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
  title: 'BrightFlow Digital | Servizi Digitali per PMI',
  description:
    'Piattaforma scalabile per servizi di consulenza e sviluppo digitale. Consulenza, sviluppo web e marketing automation per piccole e medie imprese.',
  keywords: ['consulenza digitale', 'sviluppo web', 'marketing automation', 'PMI'],
  authors: [{ name: 'Francesco di Biase' }],
  openGraph: {
    title: 'BrightFlow Digital | Servizi Digitali per PMI',
    description: 'Servizi di consulenza e sviluppo digitale per piccole e medie imprese',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
