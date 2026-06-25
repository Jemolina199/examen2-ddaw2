import { NextResponse } from 'next/server'
import db from '@/lib/db'

// cuenta cuantos productos hay por marca
export async function GET() {
  try {
    const [filas] = await db.query(`
      SELECT \`brand.code\` as marca, COUNT(*) as cantidad
      FROM product
      GROUP BY \`brand.code\`
    `)
    return NextResponse.json(filas)
  } catch(err) {
    console.log('error', err)
    return NextResponse.json({ error: 'error en servidor' }, { status: 500 })
  }
}