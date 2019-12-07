const con = require('../lib/dbconnection.js');

const obtenerOpciones = (req, res) => {
    let idCompetencia = req.params.id; // Se obtiene el id de la competencia. //

    let sql = `SELECT nombre, genero_id, director_id, actor_id FROM competencia WHERE id = ${idCompetencia};`; // Query para obtener los datos de la competencia elegida. //

    con.query(sql, function(error, resultadoCompetencia, fields){
      if (error){
        console.log("Hubo un error en la consulta", error.message);
        return res.status(500).send("Hubo un error en la consulta");
      }

      // Query para obtener las opciones de películas para la competencia. //
      let queryPeliculas = "SELECT DISTINCT pelicula.id, poster, titulo, genero_id FROM pelicula LEFT JOIN actor_pelicula ON pelicula.id = actor_pelicula.pelicula_id LEFT JOIN director_pelicula ON pelicula.id = director_pelicula.pelicula_id WHERE 1=1";
      let genero = resultadoCompetencia[0].genero_id;
      let actor = resultadoCompetencia[0].actor_id;
      let director = resultadoCompetencia[0].director_id;
      let queryGenero = genero ? ` AND pelicula.genero_id = ${genero}` : ''; // Si se utiliza un genero como filtro, se agrega a la query. //
      let queryActor = actor ? ` AND actor_pelicula.actor_id = ${actor}` : ''; // Si se utiliza un actor como filtro, se agrega a la query. //
      let queryDirector = director ? ` AND director_pelicula.director_id = ${director}` : ''; // Si se utiliza un director como filtro, se agrega a la query. //
      let randomOrder = ` ORDER BY RAND() LIMIT 2;`; // Se agrega filtro para que devuelva dos películas al azar. //

      let sql2 = queryPeliculas + queryGenero + queryActor + queryDirector + randomOrder; // Se arma la query final con los filtros que se hayan seleccionado. //

      // Se realiza la consulta. //
      con.query(sql2, function(error, peliculas, fields){
        if (error){
          console.log("Hubo un error en la consulta", error.message);
          return res.status(500).send("Hubo un error en la consulta");
        }
        //Si no hubo ningún error, se crea el objeto respuesta. //
        let response = {
          peliculas: peliculas,
          competencia: resultadoCompetencia[0].nombre
        };

        // Se envía la respuesta. //
        res.send(JSON.stringify(response));
      });
    });
};

module.exports = {
    obtenerOpciones: obtenerOpciones
};