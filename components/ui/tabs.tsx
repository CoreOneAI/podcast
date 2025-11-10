'use client';

import React, { createContext, useContext } from 'react';

function cx(base: string, extra?: string) {
  return extra ? `${base} ${extra}` : base;
}

type TabsContextType = {
  value: string;
  onValueChange?: (value: string) => void;
};

const TabsContext = createContext<TabsContextType | undefined>(undefined);

type TabsProps = {
  value: string;
  onValueChange?: (value: string) => void;
  className?: string;
  children: React.ReactNode;
};

export function Tabs({ value, onValueChange, className, children }: TabsProps) {
  return (
    <TabsContext.Provider value={{ value, onValueChange }}>
      <div className={cx('w-full', className)}>{children}</div>
    </TabsContext.Provider>
  );
}

type TabsListProps = {
  className?: string;
  children: React.ReactNode;
};

export function TabsList({ className, children }: TabsListProps) {
  return (
    <div
      className={cx(
        'inline-flex h-9 items-center justify-center rounded-lg bg-black/20 p-1 text-xs text-slate-400',
        className
      )}
    >
      {children}
    </div>
  );
}

type TabsTriggerProps = {
  value: string;
  className?: string;
  children: React.ReactNode;
};

export function TabsTrigger({ value, className, children }: TabsTriggerProps) {
  const ctx = useContext(TabsContext);
  if (!ctx) {
    throw new Error('TabsTrigger must be used inside <Tabs>.');
  }

  const isActive = ctx.value === value;

  const handleClick = () => {
    ctx.onValueChange?.(value);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cx(
        'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-xs font-medium ring-offset-black transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2',
        isActive ? 'bg-white/10 text-white' : 'text-slate-400'
      )}
    >
      {children}
    </button>
  );
}

type TabsContentProps = {
  value: string;
  className?: string;
  children: React.ReactNode;
};

export function TabsContent({ value, className, children }: TabsContentProps) {
  const ctx = useContext(TabsContext);
  if (!ctx) {
    return null;
  }

  if (ctx.value !== value) {
    return null;
  }

  return <div className={cx('mt-3', className)}>{children}</div>;
}
