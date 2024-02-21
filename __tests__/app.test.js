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

describe("GET requests", () => {

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

    describe("GET api/reviews/:review_id", () => {

        test("status 200 returns specified review object", () => {

            return supertest(app)
            .get("/api/reviews/1")
            .expect(200)
            .then((result) => {
                const {review} = result.body
                expect(review).toMatchObject({
                    review_id: 1,
                    venue_id: 1,
                    user_id: 1,
                    author: 'johnny123',
                    place_name: 'The Tipsy Tavern',
                    body: 'Great atmosphere and friendly staff. The drinks were reasonably priced. Will definitely be back!',
                    star_rating: '4.0',
                    created_at: '2021-05-15T23:00:00.000Z'
                  })
            }
            )

        })

    })

    describe("GET /api/users", () => {

        test("status 200 returns array of all users", () => {
            return supertest(app)
            .get("/api/users")
            .then((result) => {
                expect(result.status).toBe(200);
                const users = result.body.users;
                expect(Array.isArray(users)).toBe(true);
                expect(users.length).toBe(5);
            })
        })

    })

    describe("GET /api/users/:user_id", () => {

        test("status 200 returns specified user", () => {

            return supertest(app)
            .get("/api/users/5")
            .expect(200)
            .then((result) => {
                const user = result.body.user;
                expect(user.username).toBe("maxxer")
                expect(user.name).toBe("Maxwell Turner")
            })

        })

    })

})
/////////////////////////////////////////////////

describe('POST requests', () => {


    describe("POST api/reviews/:review_id", () => {

        test('status 201: POST review and returns posted review', () => {
            const reviewObj = {
                venue_id: 1,
                user_id: 1,
                place_name : "The Tipsy Tavern",
                author : "johnny123",
                body : "Good food",
                star_rating: 4,
            }
    
            return supertest(app)
            .post("/api/reviews")
            .send(reviewObj)
            .expect(201)
            .then(result => {
                expect(result.body.review).toMatchObject({
                    venue_id: 1,
                    user_id: 1,
                    author: 'johnny123',
                    place_name: 'The Tipsy Tavern',
                    body: 'Good food',
                    star_rating: '4.0',
                  })
            })

        })

    })

})

//////////////////////////////////////////////////////////////

describe('DELETE requests', () => {

    describe("DELETE api/reviews/:review_id", () => {

        test('status 204: DELETE review at specific id', () => {
            return supertest(app)
            .delete("/api/reviews/1")
            .expect(204)
            .then(result => {
                expect(result.body).toEqual({})
            })
        })
    })
})

//////////////////////////////////////////////////////////////

describe('PATCH requests', () => {

    describe("PATCH api/reviews/:review_id", () => {

        test('status 200: PATCH review body at specified review id', () => {
            const reviewObj = {
                new_body : "Really bad food",
                new_star_rating: 3
            }
            return supertest(app)
                .patch("/api/reviews/1")
                .send(reviewObj)
                .expect(200)
                .then(result => {
                    const {review} = result.body
                    expect(review).toMatchObject({
                        review_id: 1,
                        venue_id: 1,
                        user_id: 1,
                        author: 'johnny123',
                        place_name: 'The Tipsy Tavern',
                        body: "Really bad food",
                        star_rating: '3.0',
                        created_at: '2021-05-15T23:00:00.000Z'
                      })
                })
        })
        test('status 200: PATCH review body at specified review id (only the body)', () => {
            const reviewObj = {
                new_body : "Really bad food",
            }
            return supertest(app)
                .patch("/api/reviews/1")
                .send(reviewObj)
                .expect(200)
                .then(result => {
                    const {review} = result.body
                    expect(review).toMatchObject({
                        review_id: 1,
                        venue_id: 1,
                        user_id: 1,
                        author: 'johnny123',
                        place_name: 'The Tipsy Tavern',
                        body: "Really bad food",
                        star_rating: '4.0',
                        created_at: '2021-05-15T23:00:00.000Z'
                      })
                })
        })
        test('status 200: PATCH review body at specified review id (only the star_rating)', () => {
            const reviewObj = {
                new_star_rating : 1,
            }
            return supertest(app)
                .patch("/api/reviews/1")
                .send(reviewObj)
                .expect(200)
                .then(result => {
                    const {review} = result.body
                    expect(review).toMatchObject({
                        review_id: 1,
                        venue_id: 1,
                        user_id: 1,
                        author: 'johnny123',
                        place_name: 'The Tipsy Tavern',
                        body: "Great atmosphere and friendly staff. The drinks were reasonably priced. Will definitely be back!",
                        star_rating: '1.0',
                        created_at: '2021-05-15T23:00:00.000Z'
                      })
                })
        })
    })

})


