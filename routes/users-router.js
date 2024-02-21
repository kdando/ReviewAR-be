const {getUsers} = require('../controllers/users.controller')
const usersRouter = require("express").Router();

// GET ALL USERS
usersRouter
    .route("/")
    .get(getUsers)

module.exports = usersRouter