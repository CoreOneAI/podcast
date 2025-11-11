import * as React from 'react';

// Basic props shorthand
type DivProps = React.HTMLAttributes<HTMLDivElement>;
type PProps = React.HTMLAttributes<HTMLParagraphElement>;
type HProps = React.HTMLAttributes<HTMLHeadingElement>;

export function Card({ className, ...props }: DivProps) {
  return (
    <div
      className={
        'rounded-xl border border-white/10 bg-white/5 p-4 ' +
        (className ?? '')
      }
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: DivProps) {
  return (
    <div
      className={'mb-3 flex flex-col gap-1 ' + (className ?? '')}
      {...props}
    />
  );
}

export function CardTitle({ className, ...props }: HProps) {
  return (
    <h2
      className={'text-sm font-semibold text-slate-100 ' + (className ?? '')}
      {...props}
    />
  );
}

export function CardDescription({ className, ...props }: PProps) {
  return (
    <p
      className={'text-xs text-slate-400 ' + (className ?? '')}
      {...props}
    />
  );
}

export function CardContent({ className, ...props }: DivProps) {
  return <div className={className} {...props} />;
}

export function CardFooter({ className, ...props }: DivProps) {
  return (
    <div
      className={'mt-3 flex items-center justify-end gap-2 ' + (className ?? '')}
      {...props}
    />
  );
}
