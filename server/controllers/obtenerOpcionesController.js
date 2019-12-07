const con = require('../lib/dbconnection.js');

const obtenerOpciones = (req, res) => {
    let idCompetencia = req.params.id;

    let sql = `SELECT nombre, genero_id, director_id, actor_id FROM competencia WHERE id = ${idCompetencia};`;

    con.query(sql, function(error, resultadoCompetencia, fields){
      if (error){
        console.log("Hubo un error en la consulta", error.message);
        return res.status(500).send("Hubo un error en la consulta");
      }

      let queryPeliculas = "SELECT DISTINCT pelicula.id, poster, titulo, genero_id FROM pelicula LEFT JOIN actor_pelicula ON pelicula.id = actor_pelicula.pelicula_id LEFT JOIN director_pelicula ON pelicula.id = director_pelicula.pelicula_id WHERE 1=1";
      let genero = resultadoCompetencia[0].genero_id;
      let actor = resultadoCompetencia[0].actor_id;
      let director = resultadoCompetencia[0].director_id;
      let queryGenero = genero ? ` AND pelicula.genero_id = ${genero}` : '';
      let queryActor = actor ? ` AND actor_pelicula.actor_id = ${actor}` : '';
      let queryDirector = director ? ` AND director_pelicula.director_id = ${director}` : '';
      let randomOrder = ` ORDER BY RAND() LIMIT 2;`;

      let sql2 = queryPeliculas + queryGenero + queryActor + queryDirector + randomOrder;

      con.query(sql2, function(error, peliculas, fields){
        if (error){
          console.log("Hubo un error en la consulta", error.message);
          return res.status(500).send("Hubo un error en la consulta");
        }
        let response = {
          peliculas: peliculas,
          competencia: resultadoCompetencia[0].nombre
        };

        res.send(JSON.stringify(response));
      });
    });
};

module.exports = {
    obtenerOpciones: obtenerOpciones
};