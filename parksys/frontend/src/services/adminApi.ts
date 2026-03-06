const API = "http://localhost:5000/api"

/* TARIFA */

export async function obtenerTarifa(){

 const res = await fetch(`${API}/tarifa`)
 return res.json()

}

export async function actualizarTarifa(precio:number){

 const res = await fetch(`${API}/tarifa`,{
  method:"PUT",
  headers:{
   "Content-Type":"application/json"
  },
  body:JSON.stringify({precio})
 })

 return res.json()

}

/* PARQUEOS */

export async function obtenerParqueos(){

 const res = await fetch(`${API}/admin/parqueos`)
 return res.json()

}

export async function actualizarParqueo(id:number,habilitado:boolean){

 const res = await fetch(`${API}/admin/parqueos/${id}`,{
  method:"PUT",
  headers:{
   "Content-Type":"application/json"
  },
  body:JSON.stringify({habilitado})
 })

 return res.json()

}

/* REPORTES */

export async function obtenerReportes(){

 const res = await fetch(`${API}/admin/reportes`)
 return res.json()

}