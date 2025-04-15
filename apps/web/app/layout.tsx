import './globals.css';
import { AuthProvider } from '../components/providers/AuthProvider';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fruition Research',
  description: 'AI-powered research marketplace and project management platform for NYU',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-black">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
