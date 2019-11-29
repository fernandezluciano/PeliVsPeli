const con = require('../lib/dbconnection.js');

const listarCompetencias = (req, res) => {
    let sql = `SELECT * FROM competencia`;

    con.query(sql, (error, resultado, fields) =>{
        if(error){
            console.log("Hubo un error en la consulta.", error.message);
            return res.status(404).send("Hubo un error en la consulta.");
        };

        res.send(JSON.stringify(resultado));
    })
};

module.exports = {
    listarCompetencias: listarCompetencias
};

