'use client';

import { useActionState, useState } from 'react';
import { CalendarIcon, MailIcon, UserIcon, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  createBooking,
  type ActionState,
} from '@/app/actions/booking-actions';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SubmitButton } from '@/components/ui/submit-button';
import type { Service } from '@/db/schema';

type BookingFormProps = {
  services: Service[];
};

const initialState: ActionState = {
  success: false,
  message: '',
};

export function BookingForm({ services }: BookingFormProps) {
  const [state, formAction, isPending] = useActionState(
    createBooking,
    initialState,
  );

  const [date, setDate] = useState<Date>();
  const [timeValue, setTimeValue] = useState<string>('09:00');

  const selectedDateTime = date
    ? new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        parseInt(timeValue.split(':')[0] || '0', 10),
        parseInt(timeValue.split(':')[1] || '0', 10)
      )
    : undefined;

  const formattedDateTime = selectedDateTime 
    ? selectedDateTime.toISOString() 
    : '';

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl">Agendar horário</CardTitle>
        <CardDescription>
          Escolha o serviço e preencha seus dados para agendar.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          {/* Serviço */}
          <div className="space-y-2">
            <Label htmlFor="serviceId">Serviço</Label>
            <select
              id="serviceId"
              name="serviceId"
              required
              disabled={isPending}
              className="border-input bg-background ring-ring/10 flex h-9 w-full rounded-lg border px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-4 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="">Selecione um serviço</option>
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name} — {formatPrice(service.priceCents)} (
                  {service.durationMinutes} min)
                </option>
              ))}
            </select>
            {state.errors?.serviceId && (
              <p className="text-sm text-destructive">
                {state.errors.serviceId[0]}
              </p>
            )}
          </div>

          {/* Nome */}
          <div className="space-y-2">
            <Label htmlFor="clientName">Nome completo</Label>
            <div className="relative">
              <UserIcon className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
              <Input
                id="clientName"
                name="clientName"
                type="text"
                placeholder="Seu nome"
                required
                disabled={isPending}
                className="pl-9"
              />
            </div>
            {state.errors?.clientName && (
              <p className="text-sm text-destructive">
                {state.errors.clientName[0]}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="clientEmail">E-mail</Label>
            <div className="relative">
              <MailIcon className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
              <Input
                id="clientEmail"
                name="clientEmail"
                type="email"
                placeholder="seu@email.com"
                required
                disabled={isPending}
                className="pl-9"
              />
            </div>
            {state.errors?.clientEmail && (
              <p className="text-sm text-destructive">
                {state.errors.clientEmail[0]}
              </p>
            )}
          </div>

          {/* Data/Hora */}
          <div className="space-y-2 flex flex-col">
            <Label htmlFor="startTime">Data e horário</Label>
            <input type="hidden" name="startTime" value={formattedDateTime} />
            <Popover>
              <PopoverTrigger
                render={
                  <Button
                    id="startTime"
                    variant={"outline"}
                    disabled={isPending}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  />
                }
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date && selectedDateTime ? (
                  format(selectedDateTime, "PPP 'às' HH:mm", { locale: ptBR })
                ) : (
                  <span>Selecione uma data e horário</span>
                )}
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 flex flex-col items-center">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  locale={ptBR}
                />
                <div className="border-t border-border p-3 w-full flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="size-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Horário</span>
                  </div>
                  <Input 
                    type="time" 
                    value={timeValue} 
                    onChange={(e) => setTimeValue(e.target.value)} 
                    className="w-27.5 h-8"
                  />
                </div>
              </PopoverContent>
            </Popover>
            {state.errors?.startTime && (
              <p className="text-sm text-destructive">
                {state.errors.startTime[0]}
              </p>
            )}
          </div>

          {/* Feedback geral */}
          {state.message && !state.success && (
            <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {state.message}
            </div>
          )}

          {state.message && state.success && (
            <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-600 dark:text-emerald-400">
              {state.message}
            </div>
          )}

          <SubmitButton pendingText="Agendando...">
            Confirmar agendamento
          </SubmitButton>
        </form>
      </CardContent>
    </Card>
  );
}

function formatPrice(cents: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(cents / 100);
}
