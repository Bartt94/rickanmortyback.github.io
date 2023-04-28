var express = require('express'); //llamamos a Express
require('dotenv').config();
var app = express();

const request = require("request");
const cors = require("cors");

app.use(
cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    allowedHeaders: "*",
}));

var port = process.env.PORT || 8080 ; // establecemos nuestro puerto

app.get('/', function(req, res) {
  res.json({ mensaje: '¡Hola Mundo!' })   
});

app.get("/personajes",(req,res)=>{
    request(process.env.URLAPIPERSONAJES,(error,response,body)=>{

      if (error) {
          return res.status(400).json({
            status: 'error',
            error: 'req body cannot be empty',
          });
      }else{
          const personajesReick = JSON.parse(body);

          res.status(200).json({
              headers: {
                  "Access-Control-Allow-Headers" : "Content-Type",
                  "Access-Control-Allow-Origin": "https://rickandmortyapi.com",
                  "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
              },
              status: 'succes',
              data: personajesReick.results,
          });
      }

    })
});


app.post('/', function(req, res) {
  res.json({ mensaje: 'Método post' })   
});

app.del('/', function(req, res) {
  res.json({ mensaje: 'Método delete' })  
});

// iniciamos nuestro servidor
app.listen(port);
console.log('API escuchando en el puerto ' + port);

