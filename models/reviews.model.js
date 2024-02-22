const connection = require("../db/connection");

function fetchReviewById(review_id) {
  const query = `SELECT * FROM reviews WHERE review_id = $1;`;
  return connection.query(query, [review_id]).then((response) => {
    return response.rows[0];
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
  if (venue_id === undefined || user_id === undefined){
    return Promise.reject({status : 400, msg : "Missing value on NON NULL property"})
  }
  const query = `INSERT INTO reviews (venue_id, user_id, place_name, author, body, star_rating) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`;
  return connection
    .query(query, [venue_id, user_id, place_name, author, body, star_rating])
    .then((response) => {
      return response.rows[0];
    });
}

function removeReview(review_id) {
  const query = `DELETE FROM reviews WHERE review_id = $1;`;
  return connection.query(query, [review_id]).then((response) => {
    return response.rows[0];
  });
}

function updateReview(review_id, new_body, new_star_rating) {
  let query = `UPDATE reviews SET `;


  if (new_body !== undefined && new_star_rating === undefined) {
    query += `body = $1 WHERE review_id = $2 RETURNING *;`;
    return connection.query(query, [new_body, review_id]).then((response) => {
      return response.rows[0];
    });
  }

  if (new_body === undefined && new_star_rating !== undefined) {
    query += `star_rating = $1 WHERE review_id = $2 RETURNING *;`;
    return connection
      .query(query, [new_star_rating, review_id])
      .then((response) => {
        return response.rows[0];
      });
  }else {
    query += `body = $1, star_rating = $2 WHERE review_id = $3 RETURNING *;`;
    return connection
      .query(query, [new_body, new_star_rating, review_id])
      .then((response) => {
        return response.rows[0];
      });
  }

}

module.exports = { fetchReviewById, insertReview, removeReview, updateReview };
