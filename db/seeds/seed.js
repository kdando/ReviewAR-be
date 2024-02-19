const format = require("pg-format")

const db = require("../connection")

const seed = ({ venueData, reviewData, userData }) => {
    return db
    .query(`DROP TABLE IF EXISTS users;`)
    .then(() => {
        return db.query(`DROP TABLE IF EXISTS venues;`)
    })
    .then(() => {
        return db.query(`DROP TABLE IF EXISTS reviews;`)
    })
    .then(() => {
        return db.query(`
        CREATE TABLE users (
            user_id SERIAL PRIMARY KEY,
            username VARCHAR NOT NULL,
            name VARCHAR NOT NULL
        );`)
    })
    .then(() => {
        return db.query(`
        CREATE TABLE venues (
            venue_id SERIAL PRIMARY KEY,
            place_name VARCHAR NOT NULL,
            latitude VARCHAR NOT NULL,
            longitude VARCHAR NOT NULL,
            average_star_rating DECIMAL(2,1)
        );`)
    })
    .then(() => {
        return db.query(`
        CREATE TABLE reviews (
            review_id SERIAL PRIMARY KEY,
            place_name VARCHAR REFERENCES venues(place_name),
            author VARCHAR REFERENCES users(username),
            body VARCHAR NOT NULL,
            star_rating DECIMAL(2,1)
        );`)
    })
    .then(() => {
        const insertUsersQueryStr = format(
            `INSERT INTO users (username, name) VALUES %L;`, userData.map(({username, name}) => [
                username,
                name])
        )

        return db.query(insertUsersQueryStr)
    })
    .then(() => {
        const insertVenuesQueryStr = format(
            `INSERT INTO venues (place_name, latitude, longitude, average_star_rating) VALUES %L;`,
            venueData.map(({place_name, latitude, longitude, average_star_rating}) => [
                place_name, 
                latitude, 
                longitude, 
                average_star_rating])
        )
        
        return db.query(insertVenuesQueryStr)
    })
    .then(() => {
        const insertReviewsQueryStr = format(
            `INSERT INTO reviews (place_name, author, body, star_rating) VALUES %L;`,
            reviewData.map(({ place_name, author, body, star_rating }) => [
                place_name,
                author,
                body,
                star_rating
            ])
        );
        return db.query(insertReviewsQueryStr);
    })
    .catch((error) => {
        console.log("Error seeding database :(", error)
    })
}

module.exports = seed