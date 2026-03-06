"use client"

import { useContext } from "react"
import { useRouter } from "next/navigation"
import { EspacioContext } from "@/contexto/EspacioContext"

export default function CuadriculaParqueo(){

 const { espacios } = useContext(EspacioContext)

 const router = useRouter()

 function seleccionarEspacio(id:number,estado:string,habilitado:boolean){

  if(!habilitado){
   alert("Este parqueo está deshabilitado")
   return
  }

  if(estado === "ocupado"){
   alert("Espacio ocupado")
   return
  }

  router.push(`/entrada?espacio=${id}`)

 }

 function colorEspacio(e:any){

  if(!e.habilitado){
   return "bg-dark text-white"
  }

  if(e.estado === "ocupado"){
   return "bg-danger text-white"
  }

  return "bg-success text-white"

 }

 return(

  <div className="container mt-4">

   <h3>Estado del Parqueo</h3>

   <div className="row">

    {espacios.map((e:any)=>(

     <div key={e.id} className="col-md-2 mb-3">

      <div
       onClick={()=>seleccionarEspacio(e.id,e.estado,e.habilitado)}
       style={{
        cursor:"pointer",
        height:"110px"
       }}
       className={`card text-center d-flex justify-content-center ${colorEspacio(e)}`}
      >

       <div className="card-body d-flex flex-column justify-content-center">

        <h6>Espacio</h6>

        <h4>{e.numero}</h4>

        {e.estado === "ocupado" && (
         <small className="fw-bold">🚗 {e.placa}</small>
        )}

        {!e.habilitado && (
         <small>Fuera de servicio</small>
        )}

       </div>

      </div>

     </div>

    ))}

   </div>

   <div className="mt-3">

    <span className="badge bg-success me-2">Disponible</span>
    <span className="badge bg-danger me-2">Ocupado</span>
    <span className="badge bg-dark">Deshabilitado</span>

   </div>

  </div>

 )
}