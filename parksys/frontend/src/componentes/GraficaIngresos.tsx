"use client"

import {
 Chart as ChartJS,
 CategoryScale,
 LinearScale,
 BarElement,
 Title,
 Tooltip,
 Legend
} from "chart.js"

import { Bar } from "react-chartjs-2"

ChartJS.register(
 CategoryScale,
 LinearScale,
 BarElement,
 Title,
 Tooltip,
 Legend
)

export default function GraficaIngresos({datos}:any){

 const data = {
  labels: datos.map((d:any)=>d.fecha),
  datasets:[
   {
    label:"Ingresos por día",
    data: datos.map((d:any)=>d.total),
   }
  ]
 }

 return <Bar data={data}/>
}