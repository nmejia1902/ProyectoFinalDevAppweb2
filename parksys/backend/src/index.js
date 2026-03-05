const express = require("express")
const cors = require("cors")

const sequelize = require("./db/conexion")

const Vehiculo = require("./modelos/Vehiculo")
const Espacio = require("./modelos/EspacioParqueo")
const Movimiento = require("./modelos/Movimiento")
const Pago = require("./modelos/Pago")
const Tarifa = require("./modelos/Tarifa")

const app = express()

app.use(cors())
app.use(express.json())

// conexión
sequelize.authenticate()
.then(()=>{
 console.log("Conectado a MySQL")
})
.catch(err=>{
 console.error("Error de conexión", err)
})


// obtener espacios
app.get("/api/espacios", async (req,res)=>{

 const espacios = await Espacio.findAll()
 res.json(espacios)

})


// registrar entrada
app.post("/api/entrada", async (req,res)=>{

 const {placa,nombre,telefono,espacio_id} = req.body

 let vehiculo = await Vehiculo.findOne({
  where:{ placa }
 })

 if(!vehiculo){

  vehiculo = await Vehiculo.create({
   placa,
   nombre_propietario:nombre,
   telefono
  })

 }

 await Movimiento.create({
  vehiculo_id:vehiculo.id,
  espacio_id,
  hora_entrada:new Date(),
  estado:"activo"
 })

 await Espacio.update(
  {estado:"ocupado"},
  {where:{id:espacio_id}}
 )

 res.json({mensaje:"Entrada registrada"})

})


// buscar vehículo para salida
app.get("/api/salida/:placa", async (req,res)=>{

 const placa = req.params.placa

 const vehiculo = await Vehiculo.findOne({
  where:{placa}
 })

 if(!vehiculo){
  return res.json({mensaje:"Vehículo no encontrado"})
 }

 const movimiento = await Movimiento.findOne({
  where:{
   vehiculo_id:vehiculo.id,
   estado:"activo"
  }
 })

 if(!movimiento){
  return res.json({mensaje:"Vehículo no está en el parqueo"})
 }

 const tarifa = await Tarifa.findOne()

 const entrada = new Date(movimiento.hora_entrada)
 const salida = new Date()

 const horas = Math.ceil((salida - entrada)/(1000*60*60))

 const monto = horas * tarifa.precio_por_hora

 res.json({
  movimiento_id:movimiento.id,
  espacio_id:movimiento.espacio_id,
  horas,
  monto
 })

})


// registrar salida
app.post("/api/salida", async (req,res)=>{

 const {movimiento_id,espacio_id,horas,monto} = req.body

 await Movimiento.update({
  hora_salida:new Date(),
  tiempo_total:horas,
  monto_total:monto,
  estado:"finalizado"
 },{
  where:{id:movimiento_id}
 })

 await Pago.create({
  movimiento_id,
  monto,
  metodo_pago:"efectivo"
 })

 await Espacio.update(
  {estado:"disponible"},
  {where:{id:espacio_id}}
 )

 res.json({mensaje:"Salida registrada"})

})

app.listen(5000,()=>{
 console.log("Servidor ParkSys ejecutándose en puerto 5000")
})