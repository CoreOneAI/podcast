// app/guest/[id]/page.tsx
import { createSupabaseServerClient } from '@/lib/supabaseServer';
import { GuestPrepForm } from './GuestPrepForm';

type GuestPageProps = {
  params: {
    id: string;
  };
};

export default async function GuestPage({ params }: GuestPageProps) {
  const supabase = await createSupabaseServerClient();

  const { data: guest, error } = await supabase
    .from('guests')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !guest) {
    return (
      <div className="p-6">
        <h1 className="text-lg font-semibold text-white">Guest not found</h1>
        <p className="mt-2 text-sm text-slate-400">
          We couldn&apos;t load this guest. It may have been deleted or the link is
          invalid.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <GuestPrepForm guest={guest} />
    </div>
  );
}
