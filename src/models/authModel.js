const db = require("../helpers/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authModels = {
  register: (body) => {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, function (err, salt) {
        //start hash password
        const { password, role} = body;
        bcrypt.hash(password, salt, function (err, hashedPassword) {
          const newBody = { ...body, password: hashedPassword };
          if (err) {
            reject(err);
          }
          //  else if(role){
          //   reject('Bad Request')
          // }
          let query = `INSERT INTO users SET ?`;
          db.query(query, newBody, (err, data) => {
            if (!err) {
              resolve(newBody);
            } else {
              reject(err);
            }
          });
        });
      });
    });
  },
  login: (body) => {
    return new Promise((resolve, reject) => {

      let query = `SELECT id, email, password, role_id FROM users WHERE email=?`;
      const { email, password } = body;

      db.query(query, email, (err, data) => {
        if (data.length > 0) {
          let newData = data[0];
          const newBody = { id: newData.id ,email: email, role: newData.role_id };
          const hashed = bcrypt.compareSync(password, newData.password);
          if (hashed) {
            const token = jwt.sign(newBody, process.env.SECRET_KEY);
            resolve(`token : ${token}`);
          } else reject("Email or Password wrong");

        } else {
          reject(err);
        }
      });
    });
  },
};

module.exports = authModels;