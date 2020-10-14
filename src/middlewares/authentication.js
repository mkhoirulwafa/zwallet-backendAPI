const jwt = require('jsonwebtoken')
require('dotenv').config()
const secretKey = process.env.SECRET_KEY
// const {authorization} = require('./authorization')

module.exports ={
    authentication: (req, res, next)=>{
        const token = req.headers.token
        if(token){
            const decoded = jwt.verify(token, secretKey)
            if(decoded.email){
                req.decoded = decoded
                console.log('berhasil authentication')
                next()
            }
        }else{
            res.send({
                status: 403,
                message: 'Unauthenticated'
            })
        }
    }
}