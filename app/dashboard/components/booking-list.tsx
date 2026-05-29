'use client';

import { useOptimistic, useTransition } from 'react';
import { CheckCircle2, Clock, Loader2, User } from 'lucide-react';

import { confirmBooking } from '@/app/actions/booking-actions';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { Booking, Service } from '@/db/schema';

type BookingWithService = Booking & {
  service: Service;
};

type BookingListProps = {
  bookings: BookingWithService[];
};

export function BookingList({ bookings }: BookingListProps) {
  const [optimisticBookings, addOptimistic] = useOptimistic(
    bookings,
    (currentBookings, bookingId: string) =>
      currentBookings.map((b) =>
        b.id === bookingId ? { ...b, status: 'confirmed' as const } : b,
      ),
  );

  const [isPending, startTransition] = useTransition();

  function handleConfirm(bookingId: string) {
    startTransition(async () => {
      addOptimistic(bookingId);
      await confirmBooking(bookingId);
    });
  }

  if (optimisticBookings.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <Clock className="mb-3 size-10 text-muted-foreground/50" />
          <p className="text-muted-foreground">
            Nenhum agendamento para hoje.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {optimisticBookings.map((booking) => (
        <Card
          key={booking.id}
          className="border-border/50 bg-card/50 backdrop-blur-sm transition-all"
        >
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">
                {booking.service.name}
              </CardTitle>
              <Badge
                variant={
                  booking.status === 'confirmed' ? 'default' : 'secondary'
                }
                className={
                  booking.status === 'confirmed'
                    ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                    : 'border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400'
                }
              >
                {booking.status === 'confirmed' ? (
                  <>
                    <CheckCircle2 className="size-3" />
                    Confirmado
                  </>
                ) : (
                  <>
                    <Clock className="size-3" />
                    Pendente
                  </>
                )}
              </Badge>
            </div>
            <CardDescription>
              {new Date(booking.startTime).toLocaleString('pt-BR', {
                dateStyle: 'short',
                timeStyle: 'short',
              })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="size-4" />
                <span>{booking.clientName}</span>
                <span className="text-muted-foreground/50">·</span>
                <span>{booking.clientEmail}</span>
              </div>
              {booking.status === 'pending' && (
                <Button
                  size="sm"
                  onClick={() => handleConfirm(booking.id)}
                  disabled={isPending}
                >
                  {isPending ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <CheckCircle2 />
                  )}
                  Confirmar
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
