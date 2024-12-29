import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'px-4 py-2 rounded-md font-medium transition-colors',
          variant === 'primary'
            ? 'bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-opacity-80'
            : 'bg-[var(--muted)] text-[var(--foreground)] hover:bg-opacity-80',
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export default Button;