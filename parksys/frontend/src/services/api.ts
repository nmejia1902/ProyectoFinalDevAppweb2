const API = "http://localhost:5000/api"

export async function obtenerEspacios(){

 const res = await fetch(`${API}/espacios`)
 return res.json()

}

export async function registrarEntrada(data:any){

 const res = await fetch(`${API}/entrada`,{
  method:"POST",
  headers:{
   "Content-Type":"application/json"
  },
  body:JSON.stringify(data)
 })

 return res.json()

}

export async function buscarSalida(placa:string){

 const res = await fetch(`${API}/salida/${placa}`)
 return res.json()

}

export async function registrarSalida(data:any){

 const res = await fetch(`${API}/salida`,{
  method:"POST",
  headers:{
   "Content-Type":"application/json"
  },
  body:JSON.stringify(data)
 })

 return res.json()

}