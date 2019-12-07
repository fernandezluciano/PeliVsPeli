const con = require('../lib/dbconnection.js');

const obtenerGeneros = (req, res) => {
    let sql = `SELECT * FROM genero`;

    con.query(sql, (error, resultado, fields) => {
        if(error){
            return res.status(500).send("Hubo un error en la consulta.")
        };
        res.send(JSON.stringify(resultado));
    })
};

module.exports = {
    obtenerGeneros: obtenerGeneros
};