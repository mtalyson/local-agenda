'use server';

import { revalidatePath } from 'next/cache';

import { db } from '@/db';
import { bookings } from '@/db/schema';
import { bookingSchema } from '@/schemas/booking-schema';
import { eq } from 'drizzle-orm';

// ---------------------------------------------------------------------------
// Action State Type — shared contract between server and client
// ---------------------------------------------------------------------------

export type ActionState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

// ---------------------------------------------------------------------------
// createBooking — cria um novo agendamento
// ---------------------------------------------------------------------------

export async function createBooking(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const raw = {
    serviceId: formData.get('serviceId'),
    clientName: formData.get('clientName'),
    clientEmail: formData.get('clientEmail'),
    startTime: formData.get('startTime'),
  };

  const parsed = bookingSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      success: false,
      message: 'Erro de validação. Verifique os campos abaixo.',
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  try {
    await db.insert(bookings).values({
      serviceId: parsed.data.serviceId,
      clientName: parsed.data.clientName,
      clientEmail: parsed.data.clientEmail,
      startTime: new Date(parsed.data.startTime),
      status: 'pending',
    });

    revalidatePath('/dashboard');

    return {
      success: true,
      message: 'Agendamento realizado com sucesso!',
    };
  } catch (_error) {
    return {
      success: false,
      message: 'Erro interno ao criar o agendamento. Tente novamente.',
    };
  }
}

// ---------------------------------------------------------------------------
// confirmBooking — confirma um agendamento existente
// ---------------------------------------------------------------------------

export async function confirmBooking(
  bookingId: string,
): Promise<ActionState> {
  try {
    await db
      .update(bookings)
      .set({ status: 'confirmed' })
      .where(eq(bookings.id, bookingId));

    revalidatePath('/dashboard');

    return {
      success: true,
      message: 'Agendamento confirmado!',
    };
  } catch (_error) {
    return {
      success: false,
      message: 'Erro ao confirmar o agendamento.',
    };
  }
}
