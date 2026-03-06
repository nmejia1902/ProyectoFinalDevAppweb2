"use client"

import { useEffect,useState } from "react"
import { obtenerReportes } from "@/services/adminApi"

export default function Reportes(){

 const [movimientos,setMovimientos] = useState<any[]>([])

 useEffect(()=>{
  cargar()
 },[])

 async function cargar(){

  const data = await obtenerReportes()
  setMovimientos(data)

 }

 return(

  <div className="container mt-4">

   <h3>Reporte de movimientos</h3>

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