// app/page.tsx
import { redirect } from 'next/navigation';

export default function Home() {
  // Send anyone hitting "/" to the authenticated dashboard
  redirect('/dashboard');
}
