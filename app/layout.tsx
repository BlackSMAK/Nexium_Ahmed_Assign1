import '../styles/globals.css';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import AOSWrapper from './components/AOSWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'SMAK-Quote Generator',
  description: 'Hero page only',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme="synthwave">
      <body className={inter.className}>
        <AOSWrapper />
        {children}
      </body>
    </html>
  );
}
