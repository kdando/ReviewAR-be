const connection = require("../db/connection");

function fetchUsers(){
    const query = "SELECT * FROM users"
    return connection.query(query).then(response => {
        return response.rows
    })
}

module.exports = {fetchUsers}