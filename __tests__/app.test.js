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

        test("status 200: returns specified venue object", () => {
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

        test("status 400: Bad Request when attempting to GET venue by venue_id", () => {
            return supertest(app)
            .get("/api/venues/abc")
            .expect(400)
            .then((result) => {
                const { msg } = result.body;
                expect(msg).toBe("Bad Request");
            })
        })

        test("status 404: venue 'Not Found' when attempting to GET venue by venue_id", () => {
            return supertest(app)
            .get("/api/venues/30000")
            .expect(404)
            .then((result) => {
                const { msg } = result.body;
                expect(msg).toBe("Not Found");
            })
        })

    })

    describe("GET api/venues/:venue_id/reviews", () => {

        test("status 200: returns an array of reviews for specified venue", () => {

            return supertest(app)
            .get("/api/venues/5/reviews")
            .then((result) => {
                expect(result.status).toBe(200);
                const reviews = result.body.reviews;
                expect(Array.isArray(reviews)).toBe(true);
                expect(reviews.length).toBe(2);
                expect(reviews[0]).toMatchObject(    {
                    place_name: "Artistic Alley Gallery",
                    author: "emily_g",
                    body: "Fascinating art pieces! Loved exploring the gallery.",
                    star_rating: "4.0",
                  })
                  expect(reviews[1]).toMatchObject(    {
                    place_name: "Artistic Alley Gallery",
                    author: "alex_the_great",
                    body: "Not impressed. The exhibits seemed uninspired and poorly curated.",
                    star_rating: "2.0",
                  })
            })

        })

        test("status 400: Bad Request when attempting to GET reviews by venue_id", () => {
            return supertest(app)
            .get("/api/venues/abc/reviews")
            .expect(400)
            .then((result) => {
                const { msg } = result.body;
                expect(msg).toBe("Bad Request");
            })
        })


        test("status 404: reviews 'Not Found' when attempting to GET reviews by venue_id", () => {
            return supertest(app)
            .get("/api/venues/50000/reviews")
            .expect(404)
            .then((result) => {
                const { msg } = result.body;
                expect(msg).toBe("Not Found");
            })
        })

    })

    describe("GET api/reviews/:review_id", () => {

        test("status 200: returns specified review object", () => {

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

        test("status 400: Bad Request when attempting to GET review by review_id", () => {
            return supertest(app)
            .get("/api/reviews/abc")
            .expect(400)
            .then((result) => {
                const { msg } = result.body;
                expect(msg).toBe("Bad Request");
            })
        })


        test("status 404: review 'Not Found' when attempting to GET review by review_id", () => {
            return supertest(app)
            .get("/api/reviews/10000")
            .expect(404)
            .then((result) => {
                const { msg } = result.body;
                expect(msg).toBe("Not Found");
            })
        })


    })

    describe("GET /api/users", () => {

        test("status 200: returns array of all users", () => {
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

        test("status 200: returns specified user", () => {

            return supertest(app)
            .get("/api/users/5")
            .expect(200)
            .then((result) => {
                const user = result.body.user;
                expect(user.username).toBe("maxxer")
                expect(user.name).toBe("Maxwell Turner")
            })

        })

        test("status 400: Bad Request when attempting to GET user by user_id", () => {
            return supertest(app)
            .get("/api/users/abc")
            .expect(400)
            .then((result) => {
                const { msg } = result.body;
                expect(msg).toBe("Bad Request");
            })
        })


        test("status 404: user 'Not Found' when attempting to GET user by user_id", () => {
            return supertest(app)
            .get("/api/users/5000")
            .expect(404)
            .then((result) => {
                const { msg } = result.body;
                expect(msg).toBe("Not Found");
            })
        })

    })

})
/////////////////////////////////////////////////

describe('POST requests', () => {


    describe("POST api/reviews", () => {

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

        test("status 400: Missing Non Null Property (place_name)", () => {
            const reviewObj = {
                venue_id: 1,
                user_id: 1,
                author : "johnny123",
                body : "Good food",
                star_rating: 4,
            }
            return supertest(app)
            .post("/api/reviews")
            .send(reviewObj)
              .expect(400)
              .then((result) => {
                const { msg } = result.body;
                expect(msg).toBe("Missing value on NON NULL property");
              });
          });
          test("status 400: Missing Non Null Property (author)", () => {
            const reviewObj = {
                venue_id: 1,
                user_id: 1,
                place_name : "The Tipsy Tavern",
                body : "Good food",
                star_rating: 4,
            }
            return supertest(app)
            .post("/api/reviews")
            .send(reviewObj)
              .expect(400)
              .then((result) => {
                const { msg } = result.body;
                expect(msg).toBe("Missing value on NON NULL property");
              });
          });
          test("status 400: Missing Non Null Property (body)", () => {
            const reviewObj = {
                venue_id: 1,
                user_id: 1,
                place_name : "The Tipsy Tavern",
                author : "johnny123",
                star_rating: 4,
            }
            return supertest(app)
            .post("/api/reviews")
            .send(reviewObj)
              .expect(400)
              .then((result) => {
                const { msg } = result.body;
                expect(msg).toBe("Missing value on NON NULL property");
              });
          });
        
          test("status 400: Missing Non Null Property (user_id)", () => {
            const reviewObj = {
                venue_id: 1,
                place_name : "The Tipsy Tavern",
                author : "johnny123",
                body : "Good food",
                star_rating: 4,
            }
            return supertest(app)
            .post("/api/reviews")
            .send(reviewObj)
              .expect(400)
              .then((result) => {
                const { msg } = result.body;
                expect(msg).toBe("Missing value on NON NULL property");
              });
          });
          test("status 400: Missing Non Null Property empty object", () => {
            const reviewObj = {
            }
            return supertest(app)
            .post("/api/reviews")
            .send(reviewObj)
              .expect(400)
              .then((result) => {
                const { msg } = result.body;
                expect(msg).toBe("Missing value on NON NULL property");
              });
          });
          test("status 400: Missing Non Null Property (venue_id)", () => {
            const reviewObj = {
                user_id: 1, 
                place_name : "The Tipsy Tavern",
                author : "johnny123",
                body : "Good food",
                star_rating: 4,
            }
            return supertest(app)
            .post("/api/reviews")
            .send(reviewObj)
              .expect(400)
              .then((result) => {
                const { msg } = result.body;
                expect(msg).toBe("Missing value on NON NULL property");
              });
          });
          test("status 400: Missing Non Null Property (venue_id)", () => {
            const reviewObj = {
                user_id: 1, 
                place_name : "The Tipsy Tavern",
                author : "johnny123",
                body : "Good food",
                star_rating: 4,
            }
            return supertest(app)
            .post("/api/reviews")
            .send(reviewObj)
              .expect(400)
              .then((result) => {
                const { msg } = result.body;
                expect(msg).toBe("Missing value on NON NULL property");
              });
          });
          test("status 404: venue_id Not Found", () => {
            const reviewObj = {
                venue_id: 1000,
                user_id: 1, 
                place_name : "The Tipsy Tavern",
                author : "johnny123",
                body : "Good food",
                star_rating: 4,
            }
            return supertest(app)
            .post("/api/reviews")
            .send(reviewObj)
              .expect(404)
              .then((result) => {
                const { msg } = result.body;
                expect(msg).toBe("Not Found");
              });
          });
          test("status 404: user_id Not Found", () => {
            const reviewObj = {
                venue_id: 1,
                user_id: 1000, 
                place_name : "The Tipsy Tavern",
                author : "johnny123",
                body : "Good food",
                star_rating: 4,
            }
            return supertest(app)
            .post("/api/reviews")
            .send(reviewObj)
              .expect(404)
              .then((result) => {
                const { msg } = result.body;
                expect(msg).toBe("Not Found");
              });
          });
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
        test('status 400: Bad Request when deleting review', () => {
            return supertest(app)
            .delete("/api/reviews/abc")
            .expect(400)
            .then(result => {
                const { msg } = result.body;
                expect(msg).toBe("Bad Request");
            })
        })
        test('status 404: review_id Not Found', () => {
            return supertest(app)
            .delete("/api/reviews/10000")
            .expect(404)
            .then(result => {
                const { msg } = result.body;
                expect(msg).toBe("Not Found");
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


