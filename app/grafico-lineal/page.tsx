'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

// tipo para los datos que vienen del api
type Dato = {
  categoria: string
  promedio: number
}

export default function GraficoLineal() {
  const [datos, setDatos] = useState<Dato[]>([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let activo = true
    fetch('/api/promedio-categoria')
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

  if (cargando) return <p className="p-8">Cargando datos...</p>

  if (error) return <main className="p-8"><p role="alert">{error}</p><Link href="/">Volver a reportes</Link></main>
  if (datos.length === 0) return <main className="p-8"><p>No hay datos para este reporte.</p><Link href="/">Volver a reportes</Link></main>

  const data = {
    labels: datos.map(d => d.categoria),
    datasets: [
      {
        label: 'Promedio por categoria',
        data: datos.map(d => Number(Number(d.promedio).toFixed(2))),
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99, 102, 241, 0.15)',
        tension: 0.3
      }
    ]
  }

  return (
    <main className="p-8">
      <Link href="/">Volver a reportes</Link>
      <h1 className="text-xl font-bold mb-6">Promedio de valor por categoria</h1>
      <div className="bg-white p-6 rounded shadow">
        <Line data={data} />
      </div>
    </main>
  )
}