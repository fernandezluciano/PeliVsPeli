// Paquetes necesarios para el proyecto. //
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const controller = require('./controllers/controller.js');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


// Pedidos GET para cada ruta. //
app.get('/competencias', controller.listarCompetencias);
app.get('/competencias/:id/peliculas', controller.obtenerOpciones);


// Seteamos el puerto en el cual la aplicación va a escuchar los pedidos. //
const puerto = '8080';

app.listen(puerto, () => {
  console.log("Escuchando pedidos en el puerto " + puerto);
});