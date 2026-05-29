import { Clock, DollarSign } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { Service } from '@/db/schema';

type ServiceCardProps = {
  service: Service;
};

function formatPrice(cents: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(cents / 100);
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-md">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{service.name}</CardTitle>
        <CardDescription className="sr-only">
          Serviço de {service.name}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <DollarSign className="size-4 text-emerald-500" />
            {formatPrice(service.priceCents)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-4 text-sky-500" />
            {service.durationMinutes} min
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
