"use client"

import { useState } from "react"
import { buscarSalida, registrarSalida } from "@/services/api"

export default function Salida(){

 const [placa,setPlaca] = useState("")
 const [data,setData] = useState<any>(null)

 async function buscar(){

  const res = await buscarSalida(placa)
  setData(res)

 }

 async function salir(){

  await registrarSalida(data)

  alert("Salida registrada")

 }

 return(

  <div className="container mt-4">

   <h3>Salida de Vehículo</h3>

   <input
    className="form-control mb-2"
    placeholder="Placa"
    onChange={(e)=>setPlaca(e.target.value)}
   />

   <button
    className="btn btn-secondary mb-3"
    onClick={buscar}
   >
    Buscar
   </button>

   {data &&(

    <div className="card p-3">

     <p>Espacio: {data.espacio_id}</p>
     <p>Horas: {data.horas}</p>
     <p>Monto: L {data.monto}</p>

     <button
      className="btn btn-danger"
      onClick={salir}
     >
      Registrar salida
     </button>

    </div>

   )}

  </div>

 )
}