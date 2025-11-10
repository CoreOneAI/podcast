'use client';

import * as React from 'react';

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => {
        if (typeof window !== 'undefined') {
          window.print();
        }
      }}
      className="inline-flex items-center justify-center rounded-md border border-white/20 bg-transparent px-3 py-1 text-xs font-medium text-slate-200 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black transition"
    >
      Print / Save as PDF
    </button>
  );
}
