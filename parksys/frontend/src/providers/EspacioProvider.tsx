"use client"

import { useState,useEffect } from "react"
import { Espacio } from "@/modelos/Espacio"
import { obtenerEspacios } from "@/services/api"
import { EspacioContext } from "@/contexto/EspacioContext"

export default function EspacioProvider({children}:{children:React.ReactNode}){

 const [espacios,setEspacios] = useState<Espacio[]>([])

 async function cargarEspacios(){

  const data = await obtenerEspacios()
  setEspacios(data)

 }

 useEffect(()=>{

  cargarEspacios()

 },[])

 return(

  <EspacioContext.Provider
   value={{
    espacios,
    cargarEspacios
   }}
  >

   {children}

  </EspacioContext.Provider>

 )

}