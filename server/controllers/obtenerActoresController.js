const con = require('../lib/dbconnection.js');

const obtenerActores = (req, res) => {
    let sql = `SELECT * FROM actor`;

    con.query(sql, (error, resultado, fields) => {
        if(error){
            return res.status(500).send("Hubo un error en la consulta.")
        };
        res.send(JSON.stringify(resultado));
    })
};

module.exports = {
    obtenerActores: obtenerActores
};