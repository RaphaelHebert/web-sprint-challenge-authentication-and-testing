const Helper = require('../../data/dbHelper')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { SECRET } = require('../../config')

async function register(user){
    const newUser = {
        ...user,
        password: bcrypt.hashSync(user.password, 8)
    }
    const newUserId = await Helper.insert(newUser)
    return Helper.findById(newUserId)
}

function tokenBuilder (user) {
    const payload = {
        sub: user.id,
        name: user.username,
    }
    const options = {
        expiresIn: '1d'
    }
    return jwt.sign(payload, SECRET, options)
}


module.exports = {
    register,
    tokenBuilder
}