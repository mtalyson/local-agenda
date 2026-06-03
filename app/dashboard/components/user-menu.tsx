'use client';

import { useRouter } from 'next/navigation';
import { LogOut, Loader2 } from 'lucide-react';
import { useState } from 'react';

import { signOut } from '@/lib/auth-client';
import { Button } from '@/components/ui/button';

type UserMenuProps = {
  userEmail: string;
  userName: string;
};

export function UserMenu({ userEmail, userName }: UserMenuProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignOut() {
    setIsLoading(true);
    await signOut();
    router.push('/login');
    router.refresh();
  }

  return (
    <div className="flex items-center gap-3">
      <div className="hidden text-right text-sm sm:block">
        <p className="font-medium leading-none">{userName}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">{userEmail}</p>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleSignOut}
        disabled={isLoading}
        className="text-muted-foreground hover:text-foreground"
      >
        {isLoading ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <LogOut className="size-4" />
        )}
        <span className="hidden sm:inline">Sair</span>
      </Button>
    </div>
  );
}
