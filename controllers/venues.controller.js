//require models
const {
  fetchAllVenues,
  fetchVenueById,
  fetchReviewsByVenue,
} = require("../models/venues.model");
const { checkExists } = require("../utils/checkExists");

//GET ALL VENUES
function getAllVenues(req, res, next) {
  fetchAllVenues()
    .then((result) => {
      return res.status(200).send({ venues: result });
    })
    .catch(next); //PSQL ERRORS GO TO APP LEVEL
}

//GET SPECIFIC VENUE
function getVenueById(req, res, next) {
  const venue_id = req.params.venue_id;
  const venueIdExistence = checkExists("venues", "venue_id", venue_id);
  const getQuery = fetchVenueById(venue_id);

  Promise.all([getQuery, venueIdExistence])
    .then((result) => {
      return res.status(200).send({ venue: result[0] });
    })
    .catch(next); //PSQL ERRORS GO TO APP LEVEL
}

//GET REVIEWS BY VENUE
function getReviewsByVenue(req, res, next) {
  const venue_id = req.params.venue_id;
  const venueIdExistence = checkExists("venues", "venue_id", venue_id);
  const getQuery = fetchReviewsByVenue(venue_id);

  Promise.all([getQuery, venueIdExistence])
    .then((result) => {
      return res.status(200).send({ reviews: result[0] });
    })
    .catch(next); //PSQL ERRORS GO TO APP LEVEL
}

module.exports = { getAllVenues, getVenueById, getReviewsByVenue };
