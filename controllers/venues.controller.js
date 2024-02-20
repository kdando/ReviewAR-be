//require models
const { fetchAllVenues, fetchVenueById, fetchReviewsByVenue } = require("../models/venues.model")

//GET ALL VENUES
function getAllVenues (req, res, next) {
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

//GET SPECIFIC REVIEW

// function getReviewById (req, res, next) {

//     const review_id = req.params.review_id;
//     const {venue_id} = req.params

//     getReviewsByVenue(venue_id)
//     .then(({ reviews }) => {
//         const filteredReviews = reviews.filter((item) => {
//             item.review_id === review_id
//         })
//         return res.status(200).send({ review: filteredReviews[0]})
//     })
//     .catch((next) => {
//         //PSQL ERRORS GO TO APP LEVEL
//     })

// }

module.exports = { getAllVenues, getVenueById, getReviewsByVenue }