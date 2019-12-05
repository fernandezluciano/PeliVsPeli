const con = require('../lib/dbconnection.js');

const obtenerResultados = (req, res) => {
    let idCompetencia = req.params.id;

    let sql = `SELECT nombre FROM competencia WHERE id = ${idCompetencia};`; // Query para obtener el nombre de la competencia que se corresponda con el id requerido. //

    con.query(sql, (error, resultadoCompetencia, fields) => {
        // Se chequea que exista una competencia con el id pasado por parámetro. //
        if(resultadoCompetencia.length === 0){
            return res.status(404).send("La competencia indicada no existe.")
        } else {
            // Si existe una competencia con el id pasado por parámetro, se crea la query para realizar el recuento de votos de cada pelīcula. //
            sql = `SELECT pelicula_id, pelicula.poster, pelicula.titulo, COUNT(voto.id) AS votos FROM voto
            LEFT JOIN pelicula ON pelicula.id = voto.pelicula_id WHERE competencia_id = ${idCompetencia} GROUP BY competencia_id, pelicula_id, poster, titulo ORDER BY votos DESC;`
        };
        // Se realiza la consulta. //
        con.query(sql, (error, resultados, fields) => {
            if(error){
                console.log("Hubo un error en la consulta.", error.message);
                return res.status(500).send("Hubo un error en la consulta.");
            }
            // Si no hay ningún error, se crea el objeto respuesta. //
            let response = {
                competencia: resultadoCompetencia[0].nombre, // Se agrega al objeto respuesta el nombre de la competencia seleccionada por id. //
                resultados: resultados
            };

            res.send(JSON.stringify(response));
        });

    });
};

module.exports = {
    obtenerResultados: obtenerResultados
};