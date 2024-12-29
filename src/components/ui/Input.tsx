import { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'px-4 py-2 rounded-md bg-[var(--input)] text-[var(--foreground)] placeholder-[var(--muted-foreground)] border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]',
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export default Input;