"use client"

export default function Factura({data}:any){

 return(

  <div className="card mt-4">

   <div className="card-body">

    <h3 className="text-center">ParkSys</h3>
    <p className="text-center">Factura de Parqueo</p>

    <hr/>

    <p><b>Placa:</b> {data.placa}</p>
    <p><b>Espacio:</b> {data.espacio}</p>
    <p><b>Horas:</b> {data.horas}</p>

    <hr/>

    <h4>Total: L {data.monto}</h4>

    <p>Fecha: {data.fecha}</p>

    <button
     className="btn btn-primary mt-3"
     onClick={()=>window.print()}
    >
     Imprimir
    </button>

   </div>

  </div>

 )

}