import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import { CalendarDays, Star } from 'lucide-react';

import { db } from '@/db';
import { services, users } from '@/db/schema';
import { Badge } from '@/components/ui/badge';
import { BookingForm } from './components/booking-form';
import { ServiceCard } from './components/service-card';

type ProfessionalPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ProfessionalPageProps) {
  const { slug } = await params;

  const professional = await db.query.users.findFirst({
    where: eq(users.slug, slug),
  });

  if (!professional) {
    return { title: 'Profissional não encontrado — AgendaLocal' };
  }

  return {
    title: `${professional.name} — Agende seu horário | AgendaLocal`,
    description: `Agende um horário com ${professional.name} de forma rápida e simples pelo AgendaLocal.`,
  };
}

export default async function ProfessionalPage({
  params,
}: ProfessionalPageProps) {
  const { slug } = await params;

  // Busca o profissional pelo slug
  const professional = await db.query.users.findFirst({
    where: eq(users.slug, slug),
  });

  if (!professional) {
    notFound();
  }

  // Busca os serviços do profissional
  const professionalServices = await db.query.services.findMany({
    where: eq(services.userId, professional.id),
  });

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-12">
      {/* Header do profissional */}
      <section className="mb-10 text-center">
        <div className="bg-linear-to-br from-primary/20 via-primary/5 to-transparent mx-auto mb-6 flex size-20 items-center justify-center rounded-full">
          <CalendarDays className="size-10 text-primary" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">
          {professional.name}
        </h1>
        <p className="mt-1 text-muted-foreground">{professional.email}</p>
        {professional.isPremium && (
          <Badge
            variant="secondary"
            className="mt-3 gap-1 border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400"
          >
            <Star className="size-3" />
            Premium
          </Badge>
        )}
      </section>

      {/* Serviços */}
      <section className="mb-10">
        <h2 className="mb-4 text-xl font-semibold">Serviços disponíveis</h2>
        {professionalServices.length === 0 ? (
          <p className="text-muted-foreground">
            Nenhum serviço cadastrado ainda.
          </p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {professionalServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}
      </section>

      {/* Formulário de agendamento */}
      {professionalServices.length > 0 && (
        <section>
          <BookingForm services={professionalServices} />
        </section>
      )}
    </main>
  );
}
