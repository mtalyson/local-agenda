import { z } from 'zod';

export const bookingSchema = z.object({
  serviceId: z.string().uuid('Selecione um serviço válido.'),
  clientName: z
    .string()
    .min(2, 'O nome deve ter pelo menos 2 caracteres.')
    .max(100, 'O nome deve ter no máximo 100 caracteres.'),
  clientEmail: z
    .string()
    .email('Informe um e-mail válido.')
    .max(255, 'O e-mail deve ter no máximo 255 caracteres.'),
  startTime: z
    .string()
    .datetime({ message: 'Informe uma data e horário válidos (ISO 8601).' })
    .refine(
      (val) => new Date(val) > new Date(),
      'O horário do agendamento deve ser no futuro.',
    ),
});

export type BookingFormData = z.infer<typeof bookingSchema>;
