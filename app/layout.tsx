import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { Sidebar } from '@/features/layout/components/Sidebar';
import { Header } from '@/features/layout/components/Header';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Peso Latam Referidos',
  description: 'Sistema de gestión de referidos',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Sidebar />
          <Header />
          <main className="md:ml-64 pt-16 min-h-screen bg-background-light">
            <div className="p-6">{children}</div>
          </main>
        </Providers>
      </body>
    </html>
  );
}
