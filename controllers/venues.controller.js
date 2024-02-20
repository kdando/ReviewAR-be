//require models
const { fetchAllVenues, fetchVenueById, fetchReviewsByVenue } = require("../models/venues.model")

//GET ALL VENUES
function getAllVenues (req, res, next) {
    console.log("WE IN CONTR")
    fetchAllVenues()
    .then((result) => {
        return res.status(200).send({ venues: result })
    })
}

//GET SPECIFIC VENUE
function getVenueById (req, res, next) {

    const venue_id = req.params.venue_id;

    fetchVenueById(venue_id)
    .then((result) => {
        return res.status(200).send({ venue: result })
    })
    .catch((next) => {
       //PSQL ERRORS GO TO APP LEVEL
    })

}

//GET REVIEWS BY VENUE
function getReviewsByVenue (req, res, next) {

    const venue_id = req.params.venue_id;

    fetchReviewsByVenue(venue_id)
    .then((result) => {
        return res.status(200).send({ reviews: result })
    })
    .catch((next) => {
        //PSQL ERRORS GO TO APP LEVEL
    })

}

module.exports = { getAllVenues, getVenueById, getReviewsByVenue }