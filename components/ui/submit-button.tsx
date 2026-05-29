'use client';

import { useFormStatus } from 'react-dom';
import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type SubmitButtonProps = React.ComponentProps<typeof Button> & {
  pendingText?: string;
};

export function SubmitButton({
  children,
  pendingText = 'Enviando...',
  className,
  ...props
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      aria-disabled={pending}
      className={cn('w-full', className)}
      {...props}
    >
      {pending ? (
        <>
          <Loader2 className="animate-spin" />
          {pendingText}
        </>
      ) : (
        children
      )}
    </Button>
  );
}
