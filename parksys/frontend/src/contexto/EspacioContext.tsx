import { createContext } from "react"
import { Espacio } from "@/modelos/Espacio"

interface EspacioContextType{

 espacios:Espacio[]
 cargarEspacios:()=>void

}

export const EspacioContext = createContext<EspacioContextType>({
 espacios:[],
 cargarEspacios:()=>{}
})