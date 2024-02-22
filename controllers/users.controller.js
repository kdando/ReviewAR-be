const { fetchUsers, fetchUserById } = require("../models/users.model");
const { checkExists } = require("../utils/checkExists");

//GET USERS

function getUsers(req, res, next) {
  fetchUsers()
    .then((result) => {
      res.status(200).send({ users: result });
    })
    .catch(next); //PSQL ERRORS GO TO APP LEVEL
}

//GET USER BY USER_ID

function getUserById(req, res, next) {
  const { user_id } = req.params;
  const userIdExistence = checkExists("users", "user_id", user_id);
  const getQuery = fetchUserById(user_id);

  Promise.all([getQuery, userIdExistence])
    .then((result) => {
      return res.status(200).send({ user: result[0] });
    })
    .catch(next); //PSQL ERRORS GO TO APP LEVEL
}

module.exports = { getUsers, getUserById };
