const {getReviewById, postReview, deleteReview, patchReview} = require("../controllers/reviews.controller")

const reviewsRouter = require("express").Router();


//GET, PATCH, DELETE REVIEW BY ID
reviewsRouter
    .route("/:review_id")
    .get(getReviewById)
    .delete(deleteReview)
    .patch(patchReview)

//POST
reviewsRouter
    .route("/")
    .post(postReview)
module.exports = reviewsRouter
