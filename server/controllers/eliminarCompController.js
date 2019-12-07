const con = require('../lib/dbconnection.js');

const eliminarCompetencia = (req, res) => {
    let idCompetencia = req.params.id; // Se obtiene el id de la competencia deseada. //

    let sql = `SELECT * FROM competencia WHERE id = ${idCompetencia};` // Query para obtener la competencia que corresponde al id pasado por parámetro. //
   
    con.query(sql, (error, resultadoCompe, fields) => {
        if(error){
            return res.status(500).send("Hubo un error en la consulta.")
        }
        // Se chequea que exista una competencia con el id pasado por parámetro. //
        if (resultadoCompe.length === 0){
            return res.status(404).send("La competencia indicada no existe"); 
        } else {
            // Se crea la query para, en primer lugar, eliminar los votos de dicha competencia de la tabla voto. //
           let sql2 = `DELETE FROM voto WHERE competencia_id = ${idCompetencia};`;

            con.query(sql2, function(error, resultado, fields){
                if (error){
                    return res.status(404).send("Ha ocurrido un error en la consulta");
                };
                // Si no hubo ningún error, se crea la query para la eliminar la competencia. //
                let sql3 = `DELETE FROM competencia WHERE id = ${idCompetencia};`;

                // Se envía la consulta. //
                con.query(sql3, (error, resultado, fields) => {
                    if (error){
                        return res.status(404).send("Ha ocurrido un error en la consulta");
                    };
                    
                    // Si no hubo ningún error, se envía la respuesta. //
                    res.send(JSON.stringify(resultado));
                });
            });
        }
    });
};

module.exports = {
    eliminarCompetencia: eliminarCompetencia
};