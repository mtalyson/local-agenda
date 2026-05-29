import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Geist_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'AgendaLocal — Agendamento online para profissionais',
    template: '%s | AgendaLocal',
  },
  description:
    'Simplifique seus agendamentos. Crie sua página profissional, compartilhe o link e receba reservas de clientes automaticamente.',
  keywords: [
    'agendamento online',
    'agenda profissional',
    'micro-saas',
    'booking',
    'autônomos',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
