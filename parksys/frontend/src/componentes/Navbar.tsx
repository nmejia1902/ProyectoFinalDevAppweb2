"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"

export default function Navbar(){

 const router = useRouter()
 const pathname = usePathname()

 const [usuario,setUsuario] = useState<any>(null)

 useEffect(()=>{

  const user = localStorage.getItem("usuario")

  if(user){
   setUsuario(JSON.parse(user))
  }else{
   setUsuario(null)
  }

 },[pathname])

 function logout(){

  localStorage.removeItem("usuario")
  setUsuario(null)
  router.push("/login")

 }

 if(!usuario){
  return null
 }

 return(

  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

   <div className="container">

    <Link className="navbar-brand" href="/">
     ParkSys
    </Link>

    <div className="navbar-nav">

     {usuario.rol === "operador" && (

      <>
       <Link className="nav-link" href="/dashboard">
        Dashboard
       </Link>

       <Link className="nav-link" href="/entrada">
        Entrada
       </Link>

       <Link className="nav-link" href="/salida">
        Salida
       </Link>
      </>

     )}

     {usuario.rol === "admin" && (

      <>
       <Link className="nav-link" href="/admin">
        Panel Admin
       </Link>

       <Link className="nav-link" href="/admin/precios">
        Tarifas
       </Link>

       <Link className="nav-link" href="/admin/parqueos">
        Parqueos
       </Link>

       <Link className="nav-link" href="/admin/reportes">
        Reportes
       </Link>
      </>

     )}

    </div>

    <div className="d-flex align-items-center">

     <span className="text-white me-3">
      {usuario.nombre}
     </span>

     <button
      className="btn btn-danger btn-sm"
      onClick={logout}
     >
      Salir
     </button>

    </div>

   </div>

  </nav>

 )
}