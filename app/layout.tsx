// app/layout.tsx
import './globals.css';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <head>
        <title>Meine Next.js-App</title>
      </head>
      <body>{children}</body>
    </html>
  );
}