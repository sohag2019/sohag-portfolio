import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import {
  SUPABASE_ANON_KEY,
  SUPABASE_URL,
  isSupabaseConfigured,
} from '@/lib/supabase/config';

export async function POST(req: Request) {
  if (!isSupabaseConfigured) return NextResponse.json({ ok: true });
  try {
    const { section } = await req.json();
    if (!section || typeof section !== 'string')
      return NextResponse.json({ ok: false }, { status: 400 });
    const sb = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: { persistSession: false },
    });
    await sb.rpc('increment_view', { p_section: section.slice(0, 60) });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
