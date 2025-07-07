import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('https://api.quotable.io/random', {
      cache: 'no-store', 
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch quote' }, { status: 500 });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
