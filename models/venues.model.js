const connection = require("../db/connection")

function fetchAllVenues () {

    return connection.query(`SELECT * FROM venues;`)
    .then((response) => {
        console.log(response.rows, "<<<DB QUERY RESULT");
        return response.rows;
    })

}

module.exports = { fetchAllVenues }