"use client"

import { useEffect,useState } from "react"
import { obtenerReportes } from "@/services/adminApi"
import GraficaIngresos from "@/componentes/GraficaIngresos"

export default function Reportes(){

 const [movimientos,setMovimientos] = useState<any[]>([])
 const [ingresos,setIngresos] = useState<any[]>([])

 useEffect(()=>{
  cargar()
 },[])

 async function cargar(){

  const data = await obtenerReportes()

  setMovimientos(data.movimientos)
  setIngresos(data.ingresos)

 }

 const totalIngresos = ingresos.reduce(
  (acc:any,i:any)=>acc + i.total,0
 )

 return(

  <div className="container mt-4">

   <h3>Reporte de movimientos</h3>

   {/* Indicadores */}

   <div className="row mb-4">

    <div className="col-md-4">
     <div className="card p-3 text-center">
      <h5>Total ingresos</h5>
      <h3>L {totalIngresos}</h3>
     </div>
    </div>

    <div className="col-md-4">
     <div className="card p-3 text-center">
      <h5>Total movimientos</h5>
      <h3>{movimientos.length}</h3>
     </div>
    </div>

   </div>

   {/* Gráfica */}

   <div className="card p-3 mb-4">

    <h5>Ingresos por día</h5>

    <GraficaIngresos datos={ingresos}/>

   </div>

   {/* Tabla */}

   <table className="table">

    <thead>
     <tr>
      <th>ID</th>
      <th>Vehículo</th>
      <th>Espacio</th>
      <th>Entrada</th>
      <th>Salida</th>
     </tr>
    </thead>

    <tbody>

     {movimientos.map((m)=>(
      
      <tr key={m.id}>
       <td>{m.id}</td>
       <td>{m.vehiculo_id}</td>
       <td>{m.espacio_id}</td>
       <td>{m.hora_entrada}</td>
       <td>{m.hora_salida}</td>
      </tr>

     ))}

    </tbody>

   </table>

  </div>

 )
}