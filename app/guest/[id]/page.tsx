import { createSupabaseServerClient } from '@/lib/supabaseServer';
import { GuestPrepForm } from './GuestPrepForm';

type PageProps = {
  params: { id: string };
};

export default async function GuestPage({ params }: PageProps) {
  const supabase = await createSupabaseServerClient();

  const { data: guest, error } = await supabase
    .from('guests')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !guest) {
    return (
      <div className="text-sm text-slate-400">
        Guest not found or an error occurred.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-white">Guest prep: {guest.name}</h1>
        <p className="text-sm text-slate-400">
          Dating-app story prep for your host – built like a TV interview rundown.
        </p>
      </div>

      <GuestPrepForm guest={guest} />
    </div>
  );
}
