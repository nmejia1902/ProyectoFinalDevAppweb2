"use client"

import { useEffect,useState } from "react"
import { obtenerParqueos, actualizarParqueo } from "@/services/adminApi"

export default function Parqueos(){

 const [espacios,setEspacios] = useState<any[]>([])

 useEffect(()=>{
  cargar()
 },[])

 async function cargar(){

  const data = await obtenerParqueos()
  setEspacios(data)

 }

 async function cambiarEstado(id:number,habilitado:boolean){

  await actualizarParqueo(id,!habilitado)

  cargar()

 }

 return(

  <div className="container mt-4">

   <h3>Gestión de parqueos</h3>

   <table className="table">

    <thead>
     <tr>
      <th>Espacio</th>
      <th>Estado</th>
      <th>Acción</th>
     </tr>
    </thead>

    <tbody>

     {espacios.map((e)=>(
      
      <tr key={e.id}>

       <td>{e.numero}</td>

       <td>
        {e.habilitado ? "Habilitado" : "Deshabilitado"}
       </td>

       <td>

        <button
         className="btn btn-warning"
         onClick={()=>cambiarEstado(e.id,e.habilitado)}
        >
         Cambiar
        </button>

       </td>

      </tr>

     ))}

    </tbody>

   </table>

  </div>

 )

}