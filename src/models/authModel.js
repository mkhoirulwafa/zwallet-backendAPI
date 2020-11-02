const db = require("../helpers/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const query = require("../helpers/query");
require("dotenv").config();

const authModels = {
  register: (body) => {
    return query(`INSERT INTO users SET ?`, [body])
  },
  login: (body) => {
    const { email, password } = body;
    return query(`SELECT id, CONCAT(firstName, ' ', lastName) as fullName, email, password, role_id FROM users WHERE email=?`, [email] )
    // return new Promise((resolve, reject) => {
    //   const { email, password } = body;
    //   let query = `SELECT id, email, password, role_id FROM users WHERE email=?`;
    //   db.query(query, email, (err, data) => {
    //     if (!err) {
    //       let newData = data[0];
    //       const newBody = {
    //         id: newData.id,
    //         email: email,
    //         role: newData.role_id,
    //       };
    //       const hashed = bcrypt.compareSync(password, newData.password);
    //       if (hashed) {
    //         const token = jwt.sign(newBody, process.env.SECRET_KEY);
    //         let result = {...newBody, token: token}
    //         resolve(result);
    //       } else reject("Email or Password wrong");
    //     } else {
    //       reject("Email or Password wrong");
    //     }
    //   });
    // });
  },
};

module.exports = authModels;
