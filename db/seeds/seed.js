const format = require("pg-format");

const db = require("../connection");
const { createRef, formatReviews } = require("./utils");

let venueIdLookup = {};

const seed = ({ venueData, userData, reviewData }) => {
  return db
    .query(`DROP TABLE IF EXISTS reviews;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS venues;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS users;`);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE users (
            user_id SERIAL PRIMARY KEY,
            username VARCHAR NOT NULL,
            name VARCHAR NOT NULL
        );`);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE venues (
            venue_id SERIAL PRIMARY KEY,
            place_name VARCHAR NOT NULL,
            latitude VARCHAR NOT NULL,
            longitude VARCHAR NOT NULL,
            average_star_rating DECIMAL(2,1)
        );`);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE reviews (
            review_id SERIAL PRIMARY KEY,
            venue_id INT REFERENCES venues(venue_id),
            user_id INT NOT NULL REFERENCES users(user_id),
            author VARCHAR NOT NULL,
            place_name VARCHAR NOT NULL,
            body VARCHAR NOT NULL,
            star_rating DECIMAL(2,1),
            created_at DATE DEFAULT NOW()
        );`);
    })
    .then(() => {
      const insertUsersQueryStr = format(
        `INSERT INTO users (username, name) VALUES %L RETURNING *;`,
        userData.map(({ username, name }) => [username, name])
      );

      const usersPromise = db.query(insertUsersQueryStr);

      const insertVenuesQueryStr = format(
        `INSERT INTO venues (place_name, latitude, longitude, average_star_rating) VALUES %L RETURNING *;`,
        venueData.map(
          ({ place_name, latitude, longitude, average_star_rating }) => [
            place_name,
            latitude,
            longitude,
            average_star_rating,
          ]
        )
      );

      const venuePromise = db.query(insertVenuesQueryStr);
      return Promise.all([usersPromise, venuePromise]);
    })
    .then((res) => {
      const userRows = res[0].rows;
      const venueRows = res[1].rows;
      const userIdLookup = createRef(userRows, "username", "user_id");
      venueIdLookup = createRef(venueRows, "place_name", "venue_id");
      const formattedReview = formatReviews(
        reviewData,
        venueIdLookup,
        userIdLookup
      );
      
      const insertReviewsQueryStr = format(
        `INSERT INTO reviews (venue_id, user_id, author, place_name, body, star_rating, created_at) VALUES %L;`,
        formattedReview.map(
          ({ venue_id, user_id, author, place_name, body, star_rating, created_at }) => [
            venue_id,
            user_id,
            author,
            place_name,
            body,
            star_rating,
            created_at,
          ]
        )
      );
      return db.query(insertReviewsQueryStr);
    })
    .then(() => {
      // SET TRUE AVG RATINGS FOR VENUES FROM REVIEWS TABLE
      const updateVenuesQuery = `
        UPDATE venues 
        SET average_star_rating = (
          SELECT AVG(star_rating) 
          FROM reviews 
          WHERE reviews.venue_id = venues.venue_id
        );`;
  
      return db.query(updateVenuesQuery);
    })
    .catch((error) => {
      console.log("Error seeding database :(", error);
    });
};

module.exports = seed;







