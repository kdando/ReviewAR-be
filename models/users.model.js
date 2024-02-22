const connection = require("../db/connection");

function fetchUsers(){
    const query = "SELECT * FROM users"
    return connection.query(query).then(response => {
        return response.rows
    })
}

function fetchUserById(user_id) {
    const queryStr = `SELECT * FROM users WHERE user_id = $1`
    return connection.query(queryStr, [user_id])
    .then((response) => {
        return response.rows[0];
    })
}

module.exports = {fetchUsers, fetchUserById}