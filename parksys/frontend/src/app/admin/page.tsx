"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function Admin(){

 const router = useRouter()

 useEffect(()=>{

  const usuario = localStorage.getItem("usuario")

  if(!usuario){
   router.push("/login")
  }

 },[])

 return(

  <div className="container mt-4">

   <h2>Panel de Administración</h2>

   <div className="list-group mt-4">

    <Link href="/admin/precios" className="list-group-item">
     Gestión de precios
    </Link>

    <Link href="/admin/parqueos" className="list-group-item">
     Habilitar / Deshabilitar parqueos
    </Link>

    <Link href="/admin/reportes" className="list-group-item">
     Reportes
    </Link>

   </div>

  </div>

 )

}