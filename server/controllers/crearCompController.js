const con = require('../lib/dbconnection.js');

const crearCompetencia = (req, res) => {
    let nombreCompetencia = req.body.nombre
    let genero_id = (req.body.genero == '0') ? null : req.body.genero
    let director_id = (req.body.director == '0') ? null : req.body.director
    let actor_id = (req.body.actor == '0') ? null : req.body.actor
   
    let sql = `SELECT nombre FROM competencia WHERE nombre = ("${nombreCompetencia}");`; // Query que se va a utilizar para chequear que no exista una competencia con ese nombre. //

    con.query(sql, (error, resultado, fields) => {
        // Se chequea que no exista una competencia con el nombre ingresado. //
        if(resultado.length > 0){
            console.log("Ya existe una competencia con ese nombre");
            return res.status(422).send("Ya existe una competencia con ese nombre.");
        };
        // Se chequea que se haya ingresado un nombre para crear la competencia. //
        if(nombreCompetencia.length === 0){
            return res.status(422).send("No ingresaste el nombre de la competencia que deseas crear.");
        }
        
        // Query para chequear que existan al menos 2 películas con los criterios ingresados. //
        sql2 = `SELECT COUNT(*) AS cant FROM pelicula AS p LEFT JOIN director_pelicula AS dp ON (p.id = dp.pelicula_id) LEFT JOIN actor_pelicula AS ap ON (p.id = ap.pelicula_id) WHERE 1=1 `;

        // Se agregan filtros a la query según los criterios ingresados. //
        if(genero_id){
            sql2 += `AND p.genero_id = ${genero_id} `
        };
        if(director_id){
            sql2 += `AND dp.director_id = ${director_id} `
        };
        if(actor_id){
            sql2 += `AND ap.actor_id = ${actor_id}`
        };

        con.query(sql2, (error, resultado, fields) => {
            if(error){
                return res.status(500).send("Hubo un error en la consulta.")
            };
            // Se chequea que existan al menos dos películas con esos criterios para crear la competencia. //
            if(resultado[0].cant < 2){
                return res.status(422).send("Imposible crear la competencia. No existen al menos 2 películas que cumplan con los criterios ingresados.")
            };

            // Query para insertar la competencia en la tabla competencia. //
            let sql3 = `INSERT INTO competencia (nombre, genero_id, director_id, actor_id) VALUES ("${nombreCompetencia}", ${genero_id}, ${director_id}, ${actor_id});`;

            con.query(sql3, (error, resultado, fields) => {
                if(error){
                    return res.status(500).send("Hubo un error en la consulta.")
                };

                // Si no hay ningún error, se envía la respuesta. //
                res.send(JSON.stringify(resultado));
            })
        })
    })
};

module.exports = {
    crearCompetencia: crearCompetencia
};