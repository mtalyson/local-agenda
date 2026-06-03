import type { Metadata } from 'next';
import { CalendarDays } from 'lucide-react';
import Link from 'next/link';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth';
import { UserMenu } from './components/user-menu';

export const metadata: Metadata = {
  title: 'Dashboard — AgendaLocal',
  description: 'Painel administrativo do profissional.',
};

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 font-semibold"
          >
            <CalendarDays className="size-5 text-primary" />
            AgendaLocal
          </Link>
          <nav className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link
              href="/dashboard"
              className="transition-colors hover:text-foreground"
            >
              Agendamentos
            </Link>
            <Link
              href="/"
              className="transition-colors hover:text-foreground"
            >
              Início
            </Link>
            <UserMenu
              userEmail={session.user.email}
              userName={session.user.name}
            />
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
        {children}
      </main>
    </div>
  );
}
