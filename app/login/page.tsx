'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CalendarDays, Eye, EyeOff, Loader2, Mail, Lock } from 'lucide-react';

import { signIn, signUp } from '@/lib/auth-client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function LoginPage() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (isSignUp) {
        const { error } = await signUp.email({
          name: form.name,
          email: form.email,
          password: form.password,
        });

        if (error) {
          setError(error.message ?? 'Erro ao criar conta.');
          setIsLoading(false);
          return;
        }
      } else {
        const { error } = await signIn.email({
          email: form.email,
          password: form.password,
        });

        if (error) {
          setError(error.message ?? 'Credenciais inválidas.');
          setIsLoading(false);
          return;
        }
      }

      router.push('/dashboard');
      router.refresh();
    } catch {
      setError('Ocorreu um erro inesperado. Tente novamente.');
      setIsLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      {/* Background decoration */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="bg-primary/5 absolute -top-1/4 -left-1/4 h-150 w-150 rounded-full blur-3xl" />
        <div className="bg-primary/5 absolute -right-1/4 -bottom-1/4 h-150 w-150 rounded-full blur-3xl" />
      </div>

      <Card className="border-border/50 bg-card/80 relative w-full max-w-md backdrop-blur-md">
        <CardHeader className="text-center">
          <div className="from-primary/20 via-primary/10 mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-linear-to-br to-transparent">
            <CalendarDays className="text-primary size-7" />
          </div>
          <CardTitle className="text-2xl font-bold">
            {isSignUp ? 'Criar conta' : 'Entrar'}
          </CardTitle>
          <CardDescription>
            {isSignUp
              ? 'Crie sua conta para gerenciar seus agendamentos'
              : 'Acesse o painel para gerenciar seus agendamentos'}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name (sign up only) */}
            {isSignUp && (
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-foreground text-sm font-medium"
                >
                  Nome
                </label>
                <div className="relative">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required={isSignUp}
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Seu nome completo"
                    className="border-border/50 bg-background/50 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20 h-10 w-full rounded-md border px-3 py-2 text-sm transition-colors focus:ring-2 focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-foreground text-sm font-medium"
              >
                Email
              </label>
              <div className="relative">
                <Mail className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="seu@email.com"
                  className="border-border/50 bg-background/50 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20 h-10 w-full rounded-md border py-2 pr-3 pl-10 text-sm transition-colors focus:ring-2 focus:outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-foreground text-sm font-medium"
              >
                Senha
              </label>
              <div className="relative">
                <Lock className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength={8}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Mínimo 8 caracteres"
                  className="border-border/50 bg-background/50 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20 h-10 w-full rounded-md border py-2 pr-10 pl-10 text-sm transition-colors focus:ring-2 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div className="border-destructive/30 bg-destructive/10 text-destructive rounded-md border px-3 py-2 text-sm">
                {error}
              </div>
            )}

            {/* Submit */}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" />
                  {isSignUp ? 'Criando conta...' : 'Entrando...'}
                </>
              ) : isSignUp ? (
                'Criar conta'
              ) : (
                'Entrar'
              )}
            </Button>
          </form>

          {/* Toggle sign up / sign in */}
          <div className="text-muted-foreground mt-6 text-center text-sm">
            {isSignUp ? 'Já tem uma conta?' : 'Ainda não tem conta?'}{' '}
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError(null);
              }}
              className="text-primary font-medium underline-offset-4 transition-colors hover:underline"
            >
              {isSignUp ? 'Faça login' : 'Cadastre-se'}
            </button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
