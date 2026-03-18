const express = require("express")
const cors = require("cors")

const sequelize = require("./db/conexion")

const EspacioParqueo = require("./modelos/EspacioParqueo")
const Vehiculo = require("./modelos/Vehiculo")
const Movimiento = require("./modelos/Movimiento")
const Tarifa = require("./modelos/Tarifa")
const Usuario = require("./modelos/Usuario")

const app = express()

app.use(cors())
app.use(express.json())

/* 
   Api del login
*/

app.post("/api/login", async (req,res)=>{

 try{

  const {email,password} = req.body

  const user = await Usuario.findOne({
   where:{email,password}
  })

  if(!user){
   return res.json({
    success:false,
    mensaje:"Credenciales incorrectas"
   })
  }

  res.json({
   success:true,
   id:user.id,
   nombre:user.nombre,
   rol:user.rol
  })

 }catch(error){

  console.error(error)
  res.status(500).json({mensaje:"Error en login"})

 }

})

/* 
   Api para obtener los espacios del parqueo
*/

app.get("/api/espacios", async (req,res)=>{

 try{

  const espacios = await EspacioParqueo.findAll()

  const resultado = []

  for(const espacio of espacios){

   const movimiento = await Movimiento.findOne({
    where:{
     espacio_id: espacio.id,
     estado:"activo"
    }
   })

   let placa = null

   if(movimiento){

    const vehiculo = await Vehiculo.findOne({
     where:{ id:movimiento.vehiculo_id }
    })

    if(vehiculo){
     placa = vehiculo.placa
    }

   }

   resultado.push({
    id:espacio.id,
    numero:espacio.numero,
    estado:espacio.estado,
    habilitado: espacio.habilitado,
    placa
   })

  }

  res.json(resultado)

 }catch(error){

  console.error(error)
  res.status(500).json({mensaje:"Error al obtener espacios"})

 }

})

/*
   Api para regitsrar la entrada del vehiculo
*/

app.post("/api/entrada", async (req,res)=>{

 try{

  const {placa,nombre,telefono,espacio_id} = req.body

  let vehiculo = await Vehiculo.findOne({
   where:{placa}
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
   espacio_id:espacio_id,
   hora_entrada:new Date(),
   estado:"activo"
  })

  await EspacioParqueo.update(
   {estado:"ocupado"},
   {where:{id:espacio_id}}
  )

  res.json({mensaje:"Entrada registrada"})

 }catch(error){

  console.error(error)
  res.status(500).json({mensaje:"Error al registrar entrada"})

 }

})

/*
   Api para buscar la salida del vehiculo y calcular el monto a pagar  
*/

app.get("/api/salida/:placa", async (req,res)=>{

 try{

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
   monto,
   placa:vehiculo.placa,
   nombre:vehiculo.nombre_propietario
  })

 }catch(error){

  console.error(error)
  res.status(500).json({mensaje:"Error al calcular salida"})

 }

})

/*
   Api para registrar salida del vehiculo y generar el pago y cambiar estado del espacio a disponible
*/

app.post("/api/salida", async (req,res)=>{

 try{

  const {movimiento_id,espacio_id} = req.body

  await Movimiento.update(
   {
    hora_salida:new Date(),
    estado:"finalizado"
   },
   {
    where:{id:movimiento_id}
   }
  )

  await EspacioParqueo.update(
   {estado:"disponible"},
   {where:{id:espacio_id}}
  )

  res.json({mensaje:"Salida registrada"})

 }catch(error){

  console.error(error)
  res.status(500).json({mensaje:"Error al registrar salida"})

 }

})

/*
   api para obtener la tarifa actual y actualizarla
*/

app.get("/api/tarifa", async (req,res)=>{

 try{

  const tarifa = await Tarifa.findOne()

  res.json(tarifa)

 }catch(error){

  console.error(error)
  res.status(500).json({mensaje:"Error al obtener tarifa"})

 }

})

app.put("/api/tarifa", async (req,res)=>{

 try{

  const {precio} = req.body

  await Tarifa.update(
   {precio_por_hora:precio},
   {where:{id:1}}
  )

  res.json({mensaje:"Tarifa actualizada"})

 }catch(error){

  console.error(error)
  res.status(500).json({mensaje:"Error al actualizar tarifa"})

 }

})

/*
   Api de control para el administrador, para habilitar o deshabilitar espacios de parqueo y generar reportes de movimientos finalizados
*/

app.get("/api/admin/parqueos", async (req,res)=>{

 try{

  const espacios = await EspacioParqueo.findAll()

  res.json(espacios)

 }catch(error){

  console.error(error)
  res.status(500).json({mensaje:"Error al obtener parqueos"})

 }

})

app.put("/api/admin/parqueos/:id", async (req,res)=>{

 try{

  const id = req.params.id
  const {habilitado} = req.body

  await EspacioParqueo.update(
   {habilitado},
   {where:{id}}
  )

  res.json({mensaje:"Estado actualizado"})

 }catch(error){

  console.error(error)
  res.status(500).json({mensaje:"Error al actualizar parqueo"})

 }

})


/*
   api para generar reportes de movimientos finalizados para el administrador
*/

app.get("/api/admin/reportes", async (req,res)=>{

 try{

  const movimientos = await Movimiento.findAll({
   where:{estado:"finalizado"}
  })

  const tarifa = await Tarifa.findOne()

  const reporte = {}

  movimientos.forEach(m => {

   const fecha = new Date(m.hora_salida).toLocaleDateString()

   const horas = Math.ceil(
    (new Date(m.hora_salida) - new Date(m.hora_entrada)) / (1000*60*60)
   )

   const monto = horas * tarifa.precio_por_hora

   if(!reporte[fecha]){
    reporte[fecha] = 0
   }

   reporte[fecha] += monto

  })

  const resultado = Object.keys(reporte).map(fecha=>({
   fecha,
   total: reporte[fecha]
  }))

  res.json({
   movimientos,
   ingresos: resultado
  })

 }catch(error){

  console.error(error)
  res.status(500).json({mensaje:"Error en reportes"})

 }

})

/*
   iniciar el servidor y conectar a la base de datos MySQL usando Sequelize
*/

sequelize.authenticate()
.then(()=>{

 console.log("Conectado a MySQL")

 app.listen(5000,()=>{
  console.log("Servidor ParkSys ejecutándose en puerto 5000")
 })

})
.catch(error=>{
 console.error("Error de conexión:", error)
})