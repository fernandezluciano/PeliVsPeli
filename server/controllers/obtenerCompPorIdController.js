const con = require('../lib/dbconnection.js');

const obtenerCompetenciaPorId = (req, res) => {
    let idCompetencia = req.params.id; // Se obtiene el id de la competencia deseada. //

    let sql = `SELECT competencia.id, competencia.nombre, genero.nombre AS genero, director.nombre AS director, actor.nombre AS actor FROM competencia LEFT JOIN genero ON genero_id = genero.id LEFT JOIN director ON director_id= director.id LEFT JOIN actor ON actor_id = actor.id WHERE competencia.id = ${idCompetencia};` 
    
    // Se realiza la consulta. //
    con.query(sql, function(error, resultado, fields){
        if(error){
            return res.status(500).send("Hubo un error en la consulta.")
        };
        //Se chequea que exista una competencia con el id pasado por parámetro. //
        if (resultado.length === 0) {
            return res.status(404).send("La competencia indicada no existe."); 
        } else {
            // Si no hay ningún error, se crea el objeto respuesta. //
            let response = {
                'nombre': resultado[0].nombre,
                'genero_nombre': resultado[0].genero,
                'actor_nombre': resultado[0].actor,
                'director_nombre': resultado[0].director
            };

            // Se envía la respuesta. //
            res.send(JSON.stringify(response));
        }
    });
};

module.exports = {
    obtenerCompetenciaPorId: obtenerCompetenciaPorId
};