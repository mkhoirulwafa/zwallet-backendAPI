require('dotenv').config()
const secretKey = process.env.SECRET_KEY
const jwt = require('jsonwebtoken');
const formResponse = require('../helpers/formResponse');

module.exports = {
  authorization: (req, res, next) => {
    const bearerToken = req.header('token');
    if(!bearerToken) formResponse('', res, 404, 'NOT FOUND')
    else{
      const token = bearerToken.split(' ')[1];
      jwt.verify(token, secretKey, (err, decoded)=>{
        if(!err){
          if(decoded.role === 18) next();
          else if(decoded.id === req.params.id) next();
          else return formResponse('', res, 403, 'Error Forbidden')
        }else return formResponse('', res, 401, err)
      })
    }
  },
};