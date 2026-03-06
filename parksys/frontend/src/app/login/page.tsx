"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Login(){

 const router = useRouter()

 const [email,setEmail] = useState("")
 const [password,setPassword] = useState("")

 async function ingresar(e:any){

  e.preventDefault()

  const res = await fetch("http://localhost:5000/api/login",{
   method:"POST",
   headers:{
    "Content-Type":"application/json"
   },
   body:JSON.stringify({email,password})
  })

  const data = await res.json()

  if(!data.success){
   alert("Usuario o contraseña incorrectos")
   return
  }

  localStorage.setItem("usuario", JSON.stringify(data))

  if(data.rol === "admin"){
   router.push("/admin")
  }else{
   router.push("/dashboard")
  }

 }

 return(

  <div className="container mt-5" style={{maxWidth:"400px"}}>

   <h3 className="text-center mb-4">ParkSys Login</h3>

   <form onSubmit={ingresar}>

    <input
     className="form-control mb-3"
     placeholder="Email"
     onChange={(e)=>setEmail(e.target.value)}
    />

    <input
     type="password"
     className="form-control mb-3"
     placeholder="Password"
     onChange={(e)=>setPassword(e.target.value)}
    />

    <button className="btn btn-primary w-100">
     Ingresar
    </button>

   </form>

  </div>

 )

}