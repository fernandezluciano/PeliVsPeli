// Paquetes necesarios para el proyecto. //
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const contListar = require('./controllers/listarCompetenciasController.js');
const contObtOpc = require('./controllers/obtenerOpcionesController.js');
const contGuardarVotos = require('./controllers/guardarVotosController.js');
const contObtRes = require('./controllers/obtenerResultadosController.js');
const contCrearComp = require('./controllers/crearCompController.js');
const contElimVotos = require('./controllers/eliminarVotosController.js');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


// Pedidos GET para cada ruta. //
app.get('/competencias', contListar.listarCompetencias);
app.get('/competencias/:id/peliculas', contObtOpc.obtenerOpciones);
app.get('/competencias/:id/resultados', contObtRes.obtenerResultados);

// Pedidos POST para cada ruta. //
app.post('/competencias/:id/voto', contGuardarVotos.guardarVotos);
app.post('/competencias', contCrearComp.crearCompetencia);

// Pedidos DELETE para cada ruta. //
app.delete('/competencias/:id/votos', contElimVotos.eliminarVotos);

// Seteamos el puerto en el cual la aplicación va a escuchar los pedidos. //
const puerto = '8080';

app.listen(puerto, () => {
  console.log("Escuchando pedidos en el puerto " + puerto);
});