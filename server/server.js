// Paquetes necesarios para el proyecto. //
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const controlador = require('./controladores/controlador.js');
const controladorGeneros = require('./controladores/controladorGeneros.js');
const controladorId = require('./controladores/controladorId.js');
const controladorRecomendaciones = require('./controladores/controladorRecomendaciones.js');
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());





// Seteamos el puerto en el cual la aplicación va a escuchar los pedidos. //
const puerto = '8080';

app.listen(puerto, () => {
  console.log("Escuchando pedidos en el puerto " + puerto);
});