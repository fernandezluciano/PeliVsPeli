const con = require('../lib/dbconnection.js');

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

module.exports = {
    obtenerOpciones: obtenerOpciones
};