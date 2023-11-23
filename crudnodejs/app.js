var express = require("express");
var mysql = require ("mysql");
var app = express(); //ejecuta constructor
//Configurar que la API reciba JSON
app.use(express.json()); 

// Configurar la conexión a MySQL
var conexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: '',
    database: 'pw1011'
});
//Probamos la conexión
conexion.connect(function(error){
    if(error){
        throw error; //Lanzar error a usuario
    }else{
        console.log("Conectado a la base de datos")
    }
});

//peticiones del usuario(get,post,put,delete)
//solicitud y respuesta
app.get("/",function(req,res){
    res.send("<h1> Ruta de inicio principal con nodemon </h1>");
});
//Devuelve todos los alumnos 
app.get('/api/alumnos',(req,res)=>{
    conexion.query('SELECT * FROM alumnos',(error,filas)=>{
        if(error){
            throw error;
        }else{
            res.send(filas);
        }
    })
});
//Devuelve un solo alumno
app.get('/api/alumnos/:id',(req,res)=>{
    conexion.query("SELECT * FROM alumnos WHERE ncontrol = ? LIMIT 1",[req.params.id],(error,fila)=>{
        if(error){
            throw error;
        }else{
            res.send(fila);
        }
    })
});
//Dar de alta un alumno
app.post('/api/alumnos',(req,res)=>{
    let data = {ncontrol:req.body.nc,
                nombre:req.body.nom,
                carrera:req.body.car,
                estatus:req.body.est};
    let sql = "INSERT INTO alumnos SET ?";
    conexion.query(sql,data,function(error,results){
        if(error){
            throw error;
        }else{
            res.send(results);
        }
    })
});

//Actualizar un alumno
app.put('/api/alumnos/:id',(req,res)=>{
    let nc = req.params.id;
    let nom = req.body.nom;
    let car = req.body.car;
    let est = req.body.est;
    let sql = "UPDATE alumnos SET nombre = ?, carrera = ?, estatus = ? WHERE ncontrol = ?";
    conexion.query(sql,[nom,car,est,nc],function(error,results){
        if(error){
            throw error;
        }else{
            res.send(results);
        }
    })
});
//Borrar un alumno
app.delete('/api/alumnos/:id',(req,res)=>{
    conexion.query("DELETE FROM alumnos WHERE ncontrol = ?",[req.params.id],function(error,filas){
        if(error){
            throw error
        }else{
            res.send(filas)
        }
    })
});

//Crear el servidor, puerto de escucha
app.listen("3000",function(){
    console.log("Servidor en el puerto 3000");
});
