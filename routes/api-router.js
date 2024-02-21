//create top-level router
const apiRouter = require("express").Router();

//create other routers
const venuesRouter = require("./venues-router");
const reviewsRouter = require("./reviews-router")
const usersRouter = require("./users-router")

//subrouters
apiRouter.use("/venues", venuesRouter);
apiRouter.use("/reviews", reviewsRouter)
apiRouter.use("/users", usersRouter)



module.exports = apiRouter


// /places  DONE

// /places/:place_id  DONE

// /places/:place_id/reviews DONE

// reviews/:review_id DONE

// POST /reviews DONE

// PATCH /reviews/:review_id DONE

// DELETE /reviews/:review_id DONE

// GET /users DONE

// GET /users/:user_id