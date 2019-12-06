const con = require('../lib/dbconnection.js');

const crearCompetencia = (req, res) => {
    let nombreComp = req.body.nombre; // Se obtiene el nombre de la competencia que se quiere crear. //
   
    let sql = `SELECT * FROM competencia WHERE nombre = ("${nombreComp}");`; // Query que se va a utilizar para chequear que no exista una competencia con ese nombre. //

    con.query(sql, (error, resultado, fields) => {
        // Se chequea que no exista una competencia con el nombre ingresado. //
        if(resultado.length > 0){
            console.log("Ya existe una competencia con ese nombre");
            return res.status(422).send("Ya existe una competencia con ese nombre.");
        } else {
            // Si no existe una competencia con el nombre ingresado, se crea la query para insertar los valores en la tabla de competencias. //
            sqlCrear = `INSERT INTO competencia (nombre) VALUES ("${nombreComp}");`;

            // Se realiza la consulta. //
            con.query(sqlCrear, (error, resultadoCrear, fields) => {
                if(error){
                    return res.status(500).send("Hubo un error en la consulta.");
                }
                // Si no hubo ningún error, se envía la respuesta con la competencia creada. //
                res.send(JSON.stringify(resultadoCrear));
            })
        };
    })
};

module.exports = {
    crearCompetencia: crearCompetencia
};