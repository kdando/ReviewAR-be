const {getReviewById, postReview, deleteReview} = require("../controllers/reviews.controller")

const reviewsRouter = require("express").Router();


//GET, PATCH, DELETE REVIEW BY ID
reviewsRouter
    .route("/:review_id")
    .get(getReviewById)
    .delete(deleteReview)

//POST
reviewsRouter
    .route("/")
    .post(postReview)
module.exports = reviewsRouter
