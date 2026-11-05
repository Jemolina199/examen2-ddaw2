'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Pie } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

type Dato = {
  marca: string
  cantidad: number
}

export default function GraficoPie() {
  const [datos, setDatos] = useState<Dato[]>([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let activo = true
    fetch('/api/cantidad-marca')
      .then(res => {
        if (!res.ok) throw new Error('No se pudo consultar el reporte')
        return res.json()
      })
      .then(data => {
        if (!activo) return
        if (!Array.isArray(data)) throw new Error('Formato de respuesta inesperado')
        setDatos(data)
        setCargando(false)
      })
      .catch(err => {
        if (!activo) return
        setError(err instanceof Error ? err.message : 'No se pudieron cargar los datos')
        setCargando(false)
      })
    return () => { activo = false }
  }, [])

  if (cargando) return <p className="p-8">Cargando...</p>

  if (error) return <main className="p-8"><p role="alert">{error}</p><Link href="/">Volver a reportes</Link></main>
  if (datos.length === 0) return <main className="p-8"><p>No hay datos para este reporte.</p><Link href="/">Volver a reportes</Link></main>

  // colores para cada seccion del pie, al menos colores de catpuccin
  const colores = ['#ca9ee6', '#8bd5ca', '#8aadf4', '#ef4444', '#3b82f6']

  const data = {
    labels: datos.map(d => d.marca),
    datasets: [
      {
        label: 'Productos por marca',
        data: datos.map(d => d.cantidad),
        backgroundColor: datos.map((_, index) => colores[index % colores.length])
      }
    ]
  }

  return (
    <main className="p-8">
      <Link href="/">Volver a reportes</Link>
      <h1 className="text-xl font-bold mb-6">Cantidad de productos por marca</h1>
      <div className="bg-white p-4 rounded shadow max-w-md mx-auto">
        <Pie data={data} />
      </div>
    </main>
  )
}