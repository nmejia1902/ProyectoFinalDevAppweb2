"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { registrarEntrada } from "@/services/api"

export default function Entrada(){

 const params = useSearchParams()

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

  alert("Entrada registrada")

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