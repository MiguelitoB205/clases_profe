const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3000
//const uriBD = "mongodb://localhost:27017/BaseDatos"


/***************************** */
// midleware 
app.use(express.static(__dirname + '/paginas'))
app.set('view engine', 'html')
app.get('/', (req, res) => {
  res.send('Hola mundo!')
})
app.use(express.urlencoded({extended: true}))
//app.use(express.json())

/******************** */
// midleware de rutas
app.use((req, res, next)=>{
  console.log('Midleware de rutas');
  next();
})

const validacionFormulario = (req,res,next)=>{
  const nombre = req.body.nombre
  const correo = req.body.email;
  const contrasena=req.body.password;
  if(!nombre){
    res.send('Falta el nombre')
  } else if(!correo){
    res.send('Faltó el correo')
  } else if(!contrasena){
    res.send('Faltó la contraseña')
  }
  else{
    next();
  }
}


app.get('/home', (req, res) => {
      res.sendFile(__dirname + '/paginas/index.html')
})

app.get('/saludo/:nombre', (req,res)=>{
  const nombre = req.params.nombre;
  res.send(`Hola ${nombre}!`)
})
app.post('/formulario', validacionFormulario, (req,res)=>{
  const nom = req.body.nombre;
  const corr = req.body.email;
  const contr=req.body.password;
  cont = cont+1;
  console.log(`Hola ${nom}! tu correo es ${corr} y tu contraseña es ${contr}`);
  const persona1={id:cont, nombre:nom, correo:corr, contrasena:contr};
  personas.push(persona1);
  res.send(`Hola ${nom}! tu correo es ${corr} y tu contraseña es ${contr}`)
})


//CRUD PARA PERSONAS

const personas =[{id:1,nombre : "Miguel", correo: "miguelyehudi12@gmail.com", contrasena: "123456"}]
let cont = 1;

app.get('/api/personas', (req,res)=>{
  console.log(personas);
  res.json(personas)
})

app.post('/api/personas/usuario',(req,res)=>{
  const id=req.body.id;
  const persona=personas.find((persona)=>persona.id==id)
  if(!persona){
    res.status(404).send('No se encontraron personas')
  } else{
    console.log(persona);
  res.json(persona)
  }
  

}) 
// conexión a la base de datos

const connectDB = async () => {
  try {
      await mongoose.connect('mongodb://localhost:27017/BaseDeDatos')
          .then(() => console.log('Conexión a MongoDB establecida'))            
  }
  catch(err) {
      console.error('Error al conectar a MongoDB:', err);
  }
}
  connectDB()
  
/*
mongoose.connect(uriBD , {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'error de conexion:'));
db.once('open', function() {
  console.log('Conectado a la base de datos');
});
*/

// esquema de base de datos
const Schema = mongoose.Schema;
const userSchema = new Schema({
  nombre: String,
  correo: String,
  contrasena: String
})

const User = mongoose.model('User', userSchema)

/************ */
//Crear nuevo usuario
app.post('/crearRegistro',validacionFormulario, async(req,res)=>{
  const nombre = req.body.nombre
  const correo = req.body.email
  const contrasena = req.body.password
  const user = new User({nombre: nombre, correo: correo, contrasena: contrasena});
  try{
  await user.save()
  res.send('Usuario creado')
  console.log('Usuario creado');
}
catch(err){
  res.send('Error al crear usuario', err)
}}
)

//Obtener todos los usuarios

app.get('/usuarios',async(req, res)=>{
  try{
  const users = await User.find();
  res.send(users)
  console.log(users);
  }
  catch(err){
    res.send('Error al obtener usuarios', err)
  }
})

app.post('/usuario/nombre', async (req, res)=>{
  const nomb = req.body.nombre;
  console.log(nomb);
  try{
  const user = await User.findOne({nombre:nomb})
  if(!user){
    res.send('Usuario no encontrado')
  } else{
    res.send(user)
    console.log(user);
  }
} catch(err){
  res.send('Error al obtener usuario', err);
}
})

//actualizar

app.post('/usuario/actualizacionNombre', async (req, res) => {
  const nomb = req.body.nombre;
  const nuevonombre=req.body.nuevonombre;
  const nuevocorreo = req.body.email;
  const nuevacontrasena = req.body.password;
  try {
    const userUpdate = await User.findOneAndUpdate({ nombre: nomb },{nombre:nuevonombre,correo:nuevocorreo,contrasena:nuevacontrasena},{new:true, runValidators:true});
    if (!userUpdate) {
      res.send('Usuario no actualizado');
    } else {
      res.send(userUpdate);
      console.log('Usuario actualizado');
    }
  }
  catch (err) {
    res.send('Error al actualizar usuario', err);
  }
})

//Delete

app.post('/usuario/eliminar', async (req, res) => {
  const nomb = req.body.nombre;
  try {
    const user = await User.findOneAndDelete({nombre:nomb});
    if (!user) {
      res.send('Usuario no encontrado');
    } else {
      res.send('Usuario eliminado');
      console.log('Usuario eliminado');
    }
  }
  catch (err) {
    res.send('Error al eliminar usuario', err);
  }
});

app.listen(port, () => {
  console.log(`Servidor activo escuchando el puerto http://localhost:${port}`)
})
