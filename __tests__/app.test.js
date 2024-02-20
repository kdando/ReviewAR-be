const app = require("../app")
const connection = require("../db/connection")
const seed = require("../db/seeds/seed")
const testData = require("../db/data/test-data/")
const supertest = require("supertest");

//setting up for tests and clearing afterwards
beforeEach(() => {
    return seed(testData);
})
afterAll(() => {
    return connection.end();
})

//////////////////////////////

describe("basic GET requests", () => {

    describe("GET /api/venues", () => {

        test("status 200 returns array of all venues", () => {
            return supertest(app)
            .get("/api/venues")
            .then((result) => {
                expect(result.status).toBe(200);
                const venues = result.body.venues;
                expect(Array.isArray(venues)).toBe(true);
                expect(venues.length).toBe(5);
            })
        })

    })

    describe("GET /api/venues/:venue_id", () => {

        test("status 200 returns specified venue object", () => {
            return supertest(app)
            .get("/api/venues/3")
            .then((result) => {
                expect(result.status).toBe(200);
                const venue = result.body.venue;
                expect(venue.place_name).toBe("Café Latte");
                expect(venue.latitude).toBe("40.748817");
                expect(venue.longitude).toBe("-73.985428");
                expect(venue.average_star_rating).toBe("4.8");
            })
        })

    })

    describe("GET api/venues/:venue_id/reviews", () => {

        test("status 200 returns an array of reviews for specified venue", () => {

            return supertest(app)
            .get("/api/venues/5/reviews")
            .then((result) => {
                expect(result.status).toBe(200);
                const reviews = result.body.reviews;
                expect(Array.isArray(reviews)).toBe(true);
                expect(reviews.length).toBe(2);
                expect(reviews[0].author).toBe("emily_g");
                expect(reviews[0].place_name).toBe("Artistic Alley Gallery");
                expect(reviews[0].star_rating).toBe("4.0");
            })

        })

    })

})
