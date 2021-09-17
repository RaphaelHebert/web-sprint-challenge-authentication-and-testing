const Helper = require('../../data/dbHelper')

const checkUsernameAndPassword = (req, res, next) => {
    if(!req.body.username || !req.body.password){
        res.status(400).json({
            message: "username and password required"
        })
    } else {
        next()
    }

}

const checkIfUsernameIsFree = async (req, res, next) => {
    const username = req.body.username
    const user = await Helper.findByUsername(username)
    if(user){
        res.status(400).json({
            message: "username taken"
        })
    } else {
        next()
    }
} 

const checkIfUsernameExists = (req, res, next) => {
    const { username } = req.body
    const user = Helper.findByUsername(username)
    if(user){
        req.user = user
        next()
    } else {
        res.status(400).json({
            message: "invalid credentials"
        })
    }
} 

module.exports = {
    checkIfUsernameIsFree,
    checkUsernameAndPassword,
    checkIfUsernameExists
}