import { and, eq, gte, lte } from 'drizzle-orm';

import { db } from '@/db';
import { bookings, services } from '@/db/schema';
import { BookingList } from './components/booking-list';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
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

  // Busca os agendamentos do dia com o serviço associado
  const todayBookings = await db
    .select()
    .from(bookings)
    .innerJoin(services, eq(bookings.serviceId, services.id))
    .where(
      and(
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
