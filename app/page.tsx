import Link from "next/link"

export default function Home() {
  return <main className="p-8 max-w-3xl mx-auto">
    <h1 className="text-3xl font-bold mb-4">Dashboard de productos</h1>
    <p className="mb-6">Consultas SQL agrupadas y visualizadas con Chart.js.</p>
    <nav aria-label="Reportes" className="flex flex-col gap-4">
      <Link href="/grafico-lineal" className="underline">Promedio de valor por categoria</Link>
      <Link href="/grafico-pie" className="underline">Cantidad de productos por marca</Link>
    </nav>
  </main>
}
