"use client"

import Link from "next/link"

export default function Navbar(){

 return(

  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

   <div className="container">

    <span className="navbar-brand">ParkSys</span>

    <div className="navbar-nav">

     <Link className="nav-link" href="/dashboard">
      Dashboard
     </Link>

     <Link className="nav-link" href="/entrada">
      Entrada
     </Link>

     <Link className="nav-link" href="/salida">
      Salida
     </Link>

    </div>

   </div>

  </nav>

 )

}