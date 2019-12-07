const con = require('../lib/dbconnection.js');

const editarCompetencia = (req, res) => {
    let sql = `SELECT * FROM competencia WHERE nombre=?`;
    con.query(sql, [req.body.nombre], (error, resultado, fields) => {
      if (error) {
        return res.status(500).send("Hubo un error en la consulta.")
      };
      // Se chequea que no exista una competencia con el nombre que se quiere ingresar. //
      if (resultado.length !== 0) {
        return res.status(422).send("Ya existe una competencia con ese nombre!");
      };
    })
    
        let idCompetencia = req.params.id; // Se obtiene el id de la competencia a la cual se quiere modificar el nombre. //
        let nuevoNombreCompetencia = req.body.nombre; // Se obtiene el nuevo nombre que se quiere aplicar a la competencia. //

        let sql3 = `UPDATE competencia SET nombre = "${nuevoNombreCompetencia}" WHERE id = ${idCompetencia};`; // Query para modificar el nombre en la tabla competencia. //

        con.query(sql3, (error, resultadoNuevoNombre, fields) => {
           if(error){
               return res.status(500).send("Hubo un error en la consulta.")
           }
           // Si no hubo ningún error, se envía la respuesta. //
           res.send(JSON.stringify(resultadoNuevoNombre));
       })
};

module.exports = {
    editarCompetencia: editarCompetencia
};