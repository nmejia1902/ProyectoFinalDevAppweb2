"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import CuadriculaParqueo from "@/componentes/CuadriculaParqueo"

export default function Dashboard(){

 const router = useRouter()

 useEffect(()=>{

  const usuario = localStorage.getItem("usuario")

  if(!usuario){
   router.push("/login")
  }

 },[])

 return(

  <div>

   <div className="container mt-3">
    <h2>ParkSys Dashboard</h2>
   </div>

   <CuadriculaParqueo/>

  </div>

 )

}