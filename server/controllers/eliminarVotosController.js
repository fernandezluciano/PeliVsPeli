const con = require('../lib/dbconnection.js');

const eliminarVotos = (req, res) => {
    let idCompetencia = req.params.id; // Se obtiene el id de la competencia a la que se le quiere reiniciar el conteo de votos. //

    let sql = `SELECT nombre FROM competencia WHERE id = ${idCompetencia};`; // Query para obtener la competencia que se corresponda con el id requerido. //

    con.query(sql, (error, resultado, fields) => {
        // Se chequea que exista una competencia con el id pasado por parámetro. //
        if(resultado.length === 0){
            return res.status(404).send("La competencia indicada no existe.")
        } else {
            // Si la competencia requerida existe, se crea la query para eliminar los votos de esa competencia. //
            let sqlReiniciar = `DELETE from voto WHERE competencia_id = ${idCompetencia};`;

            // Se realiza la consulta. //
            con.query(sqlReiniciar, (error, resultadoReiniciar, fields) => {
                if(error){
                    return res.status(500).send("Hubo un error en la consulta.")
                };
                // Si no hubo ningún error, se envía la respuesta. //
                res.send(JSON.stringify(resultadoReiniciar));
            })
        }
    })
};

module.exports = {
    eliminarVotos: eliminarVotos
};