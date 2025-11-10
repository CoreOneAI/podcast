'use client';

import * as React from 'react';

function cx(base: string, extra?: string) {
  return extra ? `${base} ${extra}` : base;
}

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cx(
        'flex min-h-[80px] w-full rounded-md border border-white/10 bg-black/30 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  )
);

Textarea.displayName = 'Textarea';
