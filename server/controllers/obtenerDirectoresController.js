const con = require('../lib/dbconnection.js');

const obtenerDirectores = (req, res) => {
    let sql = `SELECT * FROM director`;

    con.query(sql, (error, resultado, fields) => {
        if(error){
            return res.status(500).send("Hubo un error en la consulta.")
        };
        res.send(JSON.stringify(resultado));
    })
};

module.exports = {
    obtenerDirectores: obtenerDirectores
};