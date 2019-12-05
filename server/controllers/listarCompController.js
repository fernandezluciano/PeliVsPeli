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

module.exports = {
    listarCompetencias: listarCompetencias
};