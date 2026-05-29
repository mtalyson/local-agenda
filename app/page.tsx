import Link from 'next/link';
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  Globe,
  Sparkles,
  Zap,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const features = [
  {
    icon: Globe,
    title: 'Página profissional',
    description:
      'Crie seu perfil online com link personalizável e compartilhe com seus clientes.',
  },
  {
    icon: CalendarDays,
    title: 'Agendamento inteligente',
    description:
      'Seus clientes escolhem o serviço, data e horário de forma autônoma, sem troca de mensagens.',
  },
  {
    icon: Zap,
    title: 'Confirmação instantânea',
    description:
      'Confirme agendamentos com um clique direto do seu painel, com feedback visual imediato.',
  },
  {
    icon: CheckCircle2,
    title: 'Validação robusta',
    description:
      'Dados validados automaticamente no cliente e no servidor para evitar erros e conflitos.',
  },
  {
    icon: Clock,
    title: 'Painel em tempo real',
    description:
      'Visualize todos os agendamentos do dia com status atualizado instantaneamente.',
  },
  {
    icon: Sparkles,
    title: 'Tecnologia moderna',
    description:
      'Construído com React 19, Next.js 15+ e Server Components para máxima performance.',
  },
];

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <CalendarDays className="size-5 text-primary" />
            AgendaLocal
          </Link>
          <nav className="flex items-center gap-2">
            <Button variant="ghost" size="sm" render={<Link href="/dashboard" />}>
              Dashboard
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="bg-primary/5 absolute top-1/4 left-1/2 size-150 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-2xl">
          <div className="bg-primary/10 text-primary mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl">
            <CalendarDays className="size-8" />
          </div>

          <h1 className="bg-linear-to-b from-foreground to-foreground/70 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
            Agendamentos simplificados para profissionais
          </h1>

          <p className="mx-auto mt-4 max-w-lg text-lg text-muted-foreground">
            Crie sua página profissional, compartilhe o link e deixe seus
            clientes agendarem horários automaticamente. Sem complicação.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button size="lg" render={<Link href="/dashboard" />}>
              Acessar painel
            </Button>
            <Button variant="outline" size="lg" render={<Link href="/maria-silva" />}>
              Ver exemplo de página
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-border/50 bg-muted/30 px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Tudo que você precisa em um só lugar
            </h2>
            <p className="mt-2 text-muted-foreground">
              Funcionalidades pensadas para simplificar a rotina de
              profissionais autônomos.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-md"
              >
                <CardHeader className="pb-3">
                  <div className="bg-primary/10 text-primary mb-2 flex size-10 items-center justify-center rounded-lg">
                    <feature.icon className="size-5" />
                  </div>
                  <CardTitle className="text-base">{feature.title}</CardTitle>
                  <CardDescription className="sr-only">
                    {feature.title}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 px-4 py-6">
        <div className="mx-auto flex max-w-5xl items-center justify-between text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} AgendaLocal</p>
          <p>
            Feito com React 19 + Next.js
          </p>
        </div>
      </footer>
    </div>
  );
}
