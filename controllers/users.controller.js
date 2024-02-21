const {fetchUsers, fetchUserById} = require('../models/users.model')
const { checkExists } = require("../utils/checkExists");

function getUsers(req, res, next){
    fetchUsers().then(result => {
        res.status(200).send({users : result})
    })
    .catch(next => {
    })
}

function getUserById (req, res, next) {
    const { user_id } = req.params;
    fetchUserById(user_id)
    .then((result) => {
        return res.status(200).send({ user: result })
    })
    .catch((next) => {

    })
}

module.exports = { getUsers, getUserById }