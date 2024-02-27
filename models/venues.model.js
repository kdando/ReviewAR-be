const connection = require("../db/connection")

function fetchAllVenues () {
    return connection.query(`SELECT * FROM venues;`)
    .then((response) => {
        return response.rows;
    })
}

function fetchVenueById (venue_id) {

    return connection.query(
        `SELECT * FROM venues 
        WHERE venue_id = $1;`, [venue_id])
        .then((response) => {
        return response.rows[0];
    })

}

function fetchReviewsByVenue (venue_id) {

    return connection.query(
        `SELECT * FROM reviews 
        WHERE venue_id = $1
        ORDER BY created_at DESC;`, [venue_id])
        .then((response) => {
            return response.rows
        })

}



module.exports = { fetchAllVenues, fetchVenueById, fetchReviewsByVenue }