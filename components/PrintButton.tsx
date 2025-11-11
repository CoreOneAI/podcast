// components/PrintButton.tsx
'use client';

import { Button } from '@/components/ui/button';

export default function PrintButton() {
  return (
    <Button
      type="button"
      className="border border-white/20 bg-transparent px-3 py-1 text-[11px] text-slate-200 hover:bg-white/10"
      onClick={() => {
        if (typeof window !== 'undefined') {
          window.print();
        }
      }}
    >
      Print / Save as PDF
    </Button>
  );
}
