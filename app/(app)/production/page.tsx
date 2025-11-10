// app/(app)/production/page.tsx
export default function ProductionBoardPage() {
  return (
    <div className="space-y-2">
      <h1 className="text-xl font-semibold text-slate-50">
        Production Board
      </h1>
      <p className="text-xs text-slate-400">
        A Kanban board for episodes moving from Planning → Published will live
        here.
      </p>
      <div className="mt-4 rounded-xl border border-dashed border-white/15 bg-white/5 px-4 py-6 text-sm text-slate-400">
        Kanban UI coming soon.
      </div>
    </div>
  );
}
