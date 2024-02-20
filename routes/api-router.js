//create top-level router
const apiRouter = require("express").Router();

//create other routers
const venuesRouter = require("./venues-router");


//subrouters
apiRouter.use("/venues", venuesRouter);




module.exports = apiRouter


// /places  DONE

// /places/:place_id  DONE

// /places/:place_id/reviews DONE

// /places/:place_id/reviews/:review_id

// /users

