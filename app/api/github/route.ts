import { NextResponse } from 'next/server';
import { getLastCommit, getProfile } from '@/lib/github';

export const revalidate = 900;

export async function GET() {
  const [lastCommit, profile] = await Promise.all([
    getLastCommit(),
    getProfile(),
  ]);
  return NextResponse.json(
    { lastCommit, profile },
    { headers: { 'Cache-Control': 's-maxage=900, stale-while-revalidate=3600' } }
  );
}
