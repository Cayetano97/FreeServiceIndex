import * as React from 'react';

import { cn } from '@/lib/utils';

const variants = {
  default: 'badge badge--default',
  secondary: 'badge badge--secondary',
  outline: 'badge badge--outline',
  destructive: 'badge badge--destructive',
};

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: keyof typeof variants;
}

function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <span className={cn(variants[variant], className)} {...props} />
  );
}

export { Badge };
