"use client"

import { useContext } from "react"
import { useRouter } from "next/navigation"
import { EspacioContext } from "@/contexto/EspacioContext"

export default function CuadriculaParqueo(){

 const { espacios } = useContext(EspacioContext)

 const router = useRouter()

 function seleccionarEspacio(id:number,estado:string){

  if(estado==="ocupado"){
   alert("Espacio ocupado")
   return
  }

  router.push(`/entrada?espacio=${id}`)

 }

 return(

  <div className="container mt-4">

   <h3>Estado del Parqueo</h3>

   <div className="row">

    {espacios.map((e)=>(
     
     <div key={e.id} className="col-md-2 mb-3">

      <div
       style={{cursor:"pointer"}}
       onClick={()=>seleccionarEspacio(e.id,e.estado)}
       className={`card text-center ${
        e.estado==="disponible"
        ?"bg-success text-white"
        :"bg-danger text-white"
       }`}
      >

       <div className="card-body">

        <h5>Espacio</h5>
        <h4>{e.numero}</h4>

       </div>

      </div>

     </div>

    ))}

   </div>

  </div>

 )
}