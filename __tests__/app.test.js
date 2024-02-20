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
            return supertest(app).get("/api/venues")
            .then((result) => {
                console.log(result, "<<<<<<<<<<")
                expect(result.status).toBe(200);
                const venues = result.body.venues
                expect(Array.isArray(venues)).toBe(true);
                expect(venues.length).toBe(5);
            })
        })

    })

})
