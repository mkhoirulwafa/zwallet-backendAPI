require('dotenv').config()
const secretKey = process.env.SECRET_KEY
const jwt = require('jsonwebtoken');

module.exports = {
  authorization: (req, res, next) => {
    const bearerToken = req.header('token');
    if(!bearerToken)
      res.status(404).send({
        status: false,
        message: 'NOT FOUND'
      });
    else{
      const token = bearerToken.split(' ')[1];
      jwt.verify(token, secretKey, (err, decoded)=>{
        if(!err){
          if(decoded.role === 18) next();
          else if(decoded.id === req.params.id) next();
          else{
            res.status(403).send({
              success: false,
              message: "Error Forbidden",
            });
          }
        } else{
          res.status(401).send({
            success: false,
            message: err,
          });
        }
      })
    }

    // const { role } = req.decoded;
    // if (role === 18) next();
    // else if(id === req.params.id);
    // else res.send({ status: 403, message: "Unauthorized" });
  },
};