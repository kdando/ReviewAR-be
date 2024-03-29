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