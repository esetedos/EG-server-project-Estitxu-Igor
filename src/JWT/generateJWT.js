require('dotenv').config()
const jwt = require('jsonwebtoken')

const generateAccessToken = (email) => {
   const result = jwt.sign({data: email}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 15 })
   return result
}

const generateRefreshToken = (email) => {
   const result = jwt.sign({data: email}, process.env.REFRESH_TOKEN_SECRET)
   return result
}

module.exports = {
   generateAccessToken,
   generateRefreshToken
}
