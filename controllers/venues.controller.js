//require models
const { fetchAllVenues } = require("../models/venues.model")

//GET ALL VENUES
function getAllVenues (req, res, next) {
    console.log("WE IN CONTR")
    fetchAllVenues()
    .then((result) => {
        return res.status(200).send({ venues: result })
    })
}

module.exports = { getAllVenues }