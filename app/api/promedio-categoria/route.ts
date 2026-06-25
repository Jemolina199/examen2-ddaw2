import { NextResponse } from 'next/server'
import db from '@/lib/db'

// esta ruta devuelve el promedio de value agrupado por categoria o deberia
export async function GET() {
  try {
    const [filas] = await db.query(`
      SELECT \`category.code\` as categoria, AVG(value) as promedio
      FROM product
      WHERE value > 0
      GROUP BY \`category.code\`
    `)
    return NextResponse.json(filas)
  } catch (err) {
    console.log('error al consultar', err)
    return NextResponse.json({ error: 'algo salio mal' }, { status: 500 })
  }
}