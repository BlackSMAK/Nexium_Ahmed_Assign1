// Next.js 13+ API route (app directory)

import { NextResponse } from 'next/server';

export async function GET() {
  const res = await fetch('https://api.quotable.io/random');
  const data = await res.json();
  return NextResponse.json(data);
}
