import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'Task Management System',
  description: 'Manage your tasks dynamically and seamlessly',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased bg-slate-900 text-slate-100 min-h-screen`}>
        <Toaster position="top-right" />
        {children}
      </body>
    </html>
  );
}
