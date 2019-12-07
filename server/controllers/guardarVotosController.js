const con = require('../lib/dbconnection.js');

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
        
        // Si no hay ninguún error, se envía la respuesta al pedido. //
        res.send(JSON.stringify(resultado));
    })
};

module.exports = {
    guardarVotos: guardarVotos
};