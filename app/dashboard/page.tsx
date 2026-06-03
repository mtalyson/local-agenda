import { and, eq, gte, lte } from 'drizzle-orm';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { db } from '@/db';
import { bookings, services, users } from '@/db/schema';
import { auth } from '@/lib/auth';
import { BookingList } from './components/booking-list';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  // Obtém a sessão do usuário logado
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/login');
  }

  // Busca o profissional na tabela "users" (negócio) pelo email da sessão
  const professional = await db.query.users.findFirst({
    where: eq(users.email, session.user.email),
  });

  if (!professional) {
    return (
      <div>
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">
            Conta não vinculada
          </h1>
          <p className="text-muted-foreground">
            Seu email ({session.user.email}) não está vinculado a nenhum perfil
            profissional. Entre em contato com o suporte.
          </p>
        </div>
      </div>
    );
  }

  // Calcula o início e fim do dia atual
  const now = new Date();
  const startOfDay = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  );
  const endOfDay = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    23,
    59,
    59,
    999,
  );

  // Busca os agendamentos do dia APENAS do profissional logado
  const todayBookings = await db
    .select()
    .from(bookings)
    .innerJoin(services, eq(bookings.serviceId, services.id))
    .where(
      and(
        eq(services.userId, professional.id),
        gte(bookings.startTime, startOfDay),
        lte(bookings.startTime, endOfDay),
      ),
    )
    .orderBy(bookings.startTime);

  // Formata para o tipo esperado pelo componente
  const formattedBookings = todayBookings.map((row) => ({
    ...row.bookings,
    service: row.services,
  }));

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">
          Agendamentos de hoje
        </h1>
        <p className="text-muted-foreground">
          {now.toLocaleDateString('pt-BR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>

      <BookingList bookings={formattedBookings} />
    </div>
  );
}
