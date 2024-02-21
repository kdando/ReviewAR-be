const {fetchUsers} = require('../models/users.model')
const { checkExists } = require("../utils/checkExists");

function getUsers(req, res, next){
    fetchUsers().then(result => {
        res.status(200).send({users : result})
    })
    .catch(next => {
    })
}

module.exports = { getUsers }