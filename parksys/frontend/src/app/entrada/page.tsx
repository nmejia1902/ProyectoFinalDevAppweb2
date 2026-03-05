"use client"

import { useState, useContext } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { registrarEntrada } from "@/services/api"
import { EspacioContext } from "@/contexto/EspacioContext"

export default function Entrada(){

 const params = useSearchParams()
 const router = useRouter()

 const { cargarEspacios } = useContext(EspacioContext)

 const espacioInicial = params.get("espacio") || ""

 const [placa,setPlaca] = useState("")
 const [nombre,setNombre] = useState("")
 const [telefono,setTelefono] = useState("")
 const [espacio,setEspacio] = useState(espacioInicial)

 async function guardar(e:any){

  e.preventDefault()

  await registrarEntrada({
   placa,
   nombre,
   telefono,
   espacio_id:espacio
  })

  // actualizar espacios
  await cargarEspacios()

  // regresar al dashboard
  router.push("/dashboard")

 }

 return(

  <div className="container mt-4">

   <h3>Registrar Entrada</h3>

   <form onSubmit={guardar}>

    <input
     className="form-control mb-2"
     placeholder="Placa"
     onChange={(e)=>setPlaca(e.target.value)}
    />

    <input
     className="form-control mb-2"
     placeholder="Nombre propietario"
     onChange={(e)=>setNombre(e.target.value)}
    />

    <input
     className="form-control mb-2"
     placeholder="Teléfono"
     onChange={(e)=>setTelefono(e.target.value)}
    />

    <input
     className="form-control mb-2"
     value={espacio}
     readOnly
    />

    <button className="btn btn-primary">
     Registrar
    </button>

   </form>

  </div>

 )
}