'use client'

import { useEffect, useState } from 'react'
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

  useEffect(() => {
    fetch('/api/cantidad-marca')
      .then(res => res.json())
      .then(data => {
        setDatos(data)
        setCargando(false)
      })
      .catch(err => {
        console.log('fallo la carga', err)
        setCargando(false)
      })
  }, [])

  if (cargando) return <p className="p-8">Cargando...</p>

  // colores para cada seccion del pie, al menos colores de catpuccin
  const colores = ['#ca9ee6', '#8bd5ca', '#8aadf4', '#ef4444', '#3b82f6']

  const data = {
    labels: datos.map(d => d.marca),
    datasets: [
      {
        label: 'Productos por marca',
        data: datos.map(d => d.cantidad),
        backgroundColor: colores.slice(0, datos.length)
      }
    ]
  }

  return (
    <main className="p-8">
      <h1 className="text-xl font-bold mb-6">Cantidad de productos por marca</h1>
      <div className="bg-white p-4 rounded shadow max-w-md mx-auto">
        <Pie data={data} />
      </div>
    </main>
  )
}