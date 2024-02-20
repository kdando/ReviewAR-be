const { getAllVenues } = require("../controllers/venues.controller")

//create router
const venuesRouter = require("express").Router();

venuesRouter
.route("/")
.get(getAllVenues)


module.exports = venuesRouter
