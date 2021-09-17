const db = require('./dbConfig')

function findAll () {
    return db('users')
}

function findById (id) {
    return db('users').where({id: id}).first()
}

function findByUsername (username) {
    return db('users').where({username: username}).first()
}

function insert (user) {
    return db('users').insert(user)
}


module.exports = {
    findAll,
    findById,
    findByUsername,
    insert
}