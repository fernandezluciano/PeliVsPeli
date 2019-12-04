const con = require('../lib/dbconnection.js');

const listarCompetencias = (req, res) => {
    let sql = `SELECT * FROM competencia`; // Query para obtener todas las competencias existentes. //

    // Se realiza la consulta. //
    con.query(sql, (error, resultado, fields) =>{
        if(error){
            console.log("Hubo un error en la consulta.", error.message);
            return res.status(500).send("Hubo un error en la consulta.");
        };
        // Si no hubo ningún error, se envía la respuesta con todas las competencias existentes. //
        res.send(JSON.stringify(resultado));
    })
};

const obtenerOpciones = (req, res) => {
    let idCompetencia = req.params.id;  
    let sql = `SELECT * FROM competencia WHERE id = ${idCompetencia}`; // Query para obtener la competencia que se corresponda con el id requerido. //

    con.query(sql, (error, resultadoCompetencia, fields) => {
        // Se chequea que exista una competencia con el id pasado por parámetro. //
        if(resultadoCompetencia.length == 0){
            console.log("La competencia indicada no existe.");
            return res.status(404).send("La competencia indicada no existe.");
        };
        if(error){
            console.log("Hubo un error en la consulta.", error.message);
            return res.status(500).send("Hubo un error en la consulta.");
        };

        let sqlPeliculas = `SELECT id, titulo, poster FROM pelicula ORDER BY RAND() LIMIT 2;`; // Query para obtener dos películas al azar. //

        // Se realiza la consulta. //
        con.query(sqlPeliculas, (error, resultado, fields) => {
            if(error){
                console.log("Hubo un error en la consulta.", error.message);
                return res.status(500).send("Hubo un error en la consulta.");
            } else { // Si no hay ningún error, se crea el objeto respuesta. //
                let response = {
                    competencia: resultadoCompetencia[0].nombre, // Se agrega al objeto respuesta el nombre de la competencia seleccionada por id. //
                    peliculas: resultado
                };
                res.send(JSON.stringify(response));
            };
        });
    });
};

const guardarVotos = (req, res) => {
    let idCompetencia = req.params.id; // Se obtiene el id de la competencia sobre la que se quiere votar. //
    let idPelicula = req.body.idPelicula; // Se obtiene el id de la película que se quiere votar. //

    let sql = `INSERT INTO voto (pelicula_id, competencia_id) VALUES (${idPelicula}, ${idCompetencia});`; // Query para insertar un voto. //

    // Se realiza la consulta. //
    con.query(sql, (error, resultado, fields) => {
        // Se chequea que los parámetros existan o sean correctos. //
        if (!idPelicula || isNaN(idPelicula) || !idCompetencia || isNaN(idCompetencia)) {
            return res.status(422).send("Falta ingresar un dato o uno de los datos ingresados NO es un número.")
        };
        if(error){
            res.status(500).send("Hubo un error en la consulta.")
        };
        
        // Si no hay ninguún error, se envïa la respuesta al pedido. //
        res.send(JSON.stringify(resultado));
    })
};

module.exports = {
    listarCompetencias: listarCompetencias,
    obtenerOpciones: obtenerOpciones,
    guardarVotos: guardarVotos
};