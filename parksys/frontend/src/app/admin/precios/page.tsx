"use client"

import { useEffect,useState } from "react"
import { obtenerTarifa, actualizarTarifa } from "@/services/adminApi"

export default function Precios(){

 const [precio,setPrecio] = useState(0)

 useEffect(()=>{
  cargar()
 },[])

 async function cargar(){

  const data = await obtenerTarifa()
  setPrecio(data.precio_por_hora)

 }

 async function guardar(){

  await actualizarTarifa(precio)

  alert("Tarifa actualizada")

 }

 return(

  <div className="container mt-4">

   <h3>Gestión de tarifa</h3>

   <input
    type="number"
    className="form-control mb-3"
    value={precio}
    onChange={(e)=>setPrecio(Number(e.target.value))}
   />

   <button
    className="btn btn-primary"
    onClick={guardar}
   >
    Guardar
   </button>

  </div>

 )

}