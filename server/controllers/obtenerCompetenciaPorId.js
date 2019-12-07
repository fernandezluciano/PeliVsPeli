const con = require('../lib/dbconnection.js');

const obtenerCompetenciaPorId = (req, res) => {
    let idCompetencia = req.params.id; // Se obtiene el id de la competencia deseada. //
    
    let sql = `SELECT nombre FROM competencia WHERE id = ${idCompetencia};`; // Query para obtener la competencia que corresponda al id pasado por parámetro. //
    
    // Se realiza la consulta. //
    con.query(sql, function(error, resultado, fields){
        //Se chequea que exista una competencia con el id pasado por parámetro. //
        if (resultado.length === 0) {
            return res.status(404).send("La competencia indicada no existe"); 
        } else {
            // Si no hay ningún error, se crea el objeto respuesta. //
            let response = {
                nombre: resultado[0].nombre,
            };

            res.send(JSON.stringify(response));
        }
    });
};

module.exports = {
    obtenerCompetenciaPorId: obtenerCompetenciaPorId
};