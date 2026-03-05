import 'bootstrap/dist/css/bootstrap.min.css'

import Navbar from "@/componentes/Navbar"
import EspacioProvider from "@/providers/EspacioProvider"

export default function RootLayout({
 children,
}:{
 children:React.ReactNode
}){

 return(

  <html>

   <body>

    <EspacioProvider>

     <Navbar/>

     {children}

    </EspacioProvider>

   </body>

  </html>

 )

}