const { getAllVenues, getVenueById, getReviewsByVenue } = require("../controllers/venues.controller")

//create router
const venuesRouter = require("express").Router();

venuesRouter
.route("/:venue_id/reviews")
.get(getReviewsByVenue);

venuesRouter
.route("/:venue_id")
.get(getVenueById);

venuesRouter
.route("/")
.get(getAllVenues)


module.exports = venuesRouter
