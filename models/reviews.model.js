const connection = require("../db/connection");

function fetchReviewById(review_id) {
  const query = `SELECT * FROM reviews WHERE review_id = $1;`;

  return connection.query(query, [review_id]).then((response) => {
    return response.rows;
  });
}

function insertReview(
  venue_id,
  user_id,
  place_name,
  author,
  body,
  star_rating
) {
  const query = `INSERT INTO reviews (venue_id, user_id, place_name, author, body, star_rating) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`;
  return connection
    .query(query, [venue_id, user_id, place_name, author, body, star_rating])
    .then((response) => {
      console.log(response.rows);
      return response.rows[0];
    });
}

function removeReview(review_id) {
  const query = `DELETE FROM reviews WHERE review_id = $1;`;
  return connection.query(query, [review_id]).then((response) => {
    return response.rows[0];
  });
}
module.exports = { fetchReviewById, insertReview };
