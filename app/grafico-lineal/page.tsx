'use client'

import { useEffect, useState } from 'react'
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

  useEffect(() => {
    fetch('/api/promedio-categoria')
      .then(res => res.json())
      .then(data => {
        setDatos(data)
        setCargando(false)
      })
      .catch(err => {
        console.log('no cargo', err)
        setCargando(false)
      })
  }, [])

  if (cargando) return <p className="p-8">Cargando datos...</p>

  const data = {
    labels: datos.map(d => d.categoria),
    datasets: [
      {
        label: 'Promedio por categoria',
        data: datos.map(d => Number(d.promedio).toFixed(2)),
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99, 102, 241, 0.15)',
        tension: 0.3
      }
    ]
  }

  return (
    <main className="p-8">
      <h1 className="text-xl font-bold mb-6">Promedio de valor por categoria</h1>
      <div className="bg-white p-6 rounded shadow">
        <Line data={data} />
      </div>
    </main>
  )
}