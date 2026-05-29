import { relations } from 'drizzle-orm';
import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';

// ---------------------------------------------------------------------------
// Enums
// ---------------------------------------------------------------------------

export const bookingStatusEnum = pgEnum('booking_status', [
  'pending',
  'confirmed',
]);

// ---------------------------------------------------------------------------
// Users (Profissionais)
// ---------------------------------------------------------------------------

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  slug: text('slug').notNull().unique(),
  isPremium: boolean('is_premium').notNull().default(false),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});

// ---------------------------------------------------------------------------
// Services (Serviços oferecidos pelo profissional)
// ---------------------------------------------------------------------------

export const services = pgTable('services', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  priceCents: integer('price_cents').notNull(),
  durationMinutes: integer('duration_minutes').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});

// ---------------------------------------------------------------------------
// Bookings (Agendamentos)
// ---------------------------------------------------------------------------

export const bookings = pgTable('bookings', {
  id: uuid('id').primaryKey().defaultRandom(),
  serviceId: uuid('service_id')
    .notNull()
    .references(() => services.id, { onDelete: 'cascade' }),
  clientName: text('client_name').notNull(),
  clientEmail: text('client_email').notNull(),
  startTime: timestamp('start_time', { withTimezone: true }).notNull(),
  status: bookingStatusEnum('status').notNull().default('pending'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});

// ---------------------------------------------------------------------------
// Relations
// ---------------------------------------------------------------------------

export const usersRelations = relations(users, ({ many }) => ({
  services: many(services),
}));

export const servicesRelations = relations(services, ({ one, many }) => ({
  user: one(users, {
    fields: [services.userId],
    references: [users.id],
  }),
  bookings: many(bookings),
}));

export const bookingsRelations = relations(bookings, ({ one }) => ({
  service: one(services, {
    fields: [bookings.serviceId],
    references: [services.id],
  }),
}));

// ---------------------------------------------------------------------------
// Inferred Types
// ---------------------------------------------------------------------------

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Service = typeof services.$inferSelect;
export type NewService = typeof services.$inferInsert;

export type Booking = typeof bookings.$inferSelect;
export type NewBooking = typeof bookings.$inferInsert;

export type BookingStatus = (typeof bookingStatusEnum.enumValues)[number];
