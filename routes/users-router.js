const {getUsers, getUserById} = require('../controllers/users.controller')
const usersRouter = require("express").Router();

// GET SPECIFIC USER
usersRouter
    .route("/:user_id")
    .get(getUserById)

// GET ALL USERS
usersRouter
    .route("/")
    .get(getUsers)

module.exports = usersRouter