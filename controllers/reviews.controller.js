const {
  fetchReviewById,
  insertReview,
  removeReview,
  updateReview,
} = require("../models/reviews.model");
const { checkExists } = require("../utils/checkExists");

//GET REVIEWS BY REVIEW ID

function getReviewById(req, res, next) {
  const { review_id } = req.params;
  const reviewIdExistence = checkExists("reviews", "review_id", review_id);
  const getQuery = fetchReviewById(review_id);

  Promise.all([getQuery, reviewIdExistence])
    .then((result) => {
      return res.status(200).send({ review: result[0] });
    })
    .catch(next); //PSQL ERRORS GO TO APP LEVEL
}

//POST REVIEW

function postReview(req, res, next) {
  const { venue_id, user_id, place_name, author, body, star_rating } = req.body;
  const venueIdExistence = checkExists("reviews", "venue_id", venue_id);
  const userIdExistence = checkExists("users", "user_id", user_id);
  const postQuery = insertReview(
    venue_id,
    user_id,
    place_name,
    author,
    body,
    star_rating
  );
  Promise.all([postQuery, venueIdExistence, userIdExistence])
    .then((result) => {
      return res.status(201).send({ review: result[0] });
    })
    .catch(next); //PSQL ERRORS GO TO APP LEVEL
}

//DELETE REVIEW BY REVIEW ID

function deleteReview(req, res, next) {
  const { review_id } = req.params;
  const reviewIdExistence = checkExists("reviews", "review_id", review_id);
  const deleteQuery = removeReview(review_id);
  Promise.all([deleteQuery, reviewIdExistence])
    .then(() => {
      res.status(204).send();
    })
    .catch(next); //PSQL ERRORS GO TO APP LEVEL
}

//PATCH REVIEW

function patchReview(req, res, next) {
  const { review_id } = req.params;
  const { new_body, new_star_rating } = req.body;
  const reviewIdExistence = checkExists("reviews", "review_id", review_id);
  const updateQuery = updateReview(review_id, new_body, new_star_rating);
  Promise.all([updateQuery, reviewIdExistence])
    .then((result) => {
      res.status(200).send({ review: result[0] });
    })
    .catch(next);
}

module.exports = { getReviewById, postReview, deleteReview, patchReview };
