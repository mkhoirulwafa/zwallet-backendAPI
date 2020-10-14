const db = require("../helpers/db");
const bcrypt = require("bcrypt");
require("dotenv").config();

const userModels = {
  getAllUsers: () => {
    return new Promise((resolve, reject) => {
      let query = `SELECT * FROM users`;
      db.query(query, (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          console.log(err);
        }
      });
    });
  },
  getUserById: (params) => {
    const { id } = params;
    return new Promise((resolve, reject) => {
      let query = `SELECT * FROM users WHERE id=?`;
      db.query(query, id, (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject(err);
        }
      });
    });
  },
  getUserPagination: (queries) => {
    let { page, limit } = queries;
    return new Promise((resolve, reject) => {
      console.log(queries.limit);
      !limit ? (limit = 2) : parseInt(limit);
      !page ? (page = 1) : parseInt(page);
      let query = `SELECT * FROM users LIMIT ${limit} OFFSET ${
        (page - 1) * limit
      }`;
      db.query(query, (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          console.log(err);
        }
      });
    });
  },
  postUser: (body) => {
    const { email, password, role } = body;
    return new Promise((resolve, reject) => {
      if (email && password) {
        bcrypt.genSalt(10, function (err, salt) {
          //start hash password
          const { password } = body;
          bcrypt.hash(password, salt, function (err, hashedPassword) {
            const newBody = { ...body, password: hashedPassword };
            if (err) {
              reject(err);
            }
            let query = `INSERT INTO users SET ?`;
            db.query(query, newBody, (err, res) => {
              if (!err) {
                resolve(newBody);
              } else {
                reject("Failed to Create User");
              }
            });
          });
        });
      } else {
        reject("Form must be filled correctly");
      }
    });
  },
  updateUser: (params, body) => {
    const { id, email } = params;
    let newBody = {...body}
    return new Promise((resolve, reject) => {
      if (req.file) {
        let avatar = `${process.env.BASE_URI}/images/${req.file.filename}`;
        const newBody = { ...body, avatar: avatar };
      }
      if (body.password) {
        bcrypt.genSalt(10, function (err, salt) {
          //start hash password
          const { password } = body;
          bcrypt.hash(password, salt, function (err, hashedPassword) {
            const newBody = { ...body, password: hashedPassword };
            if (err) {
              reject(err);
            }
          });
        });
      }
      let query = `UPDATE users SET ? WHERE id=? OR email=?`;
        db.query(query, [newBody, id, email], (err, res) => {
          if (!err) {
            resolve(newBody);
          } else {
            reject(err);
          }
        });
    });
  },
  deleteUser: (params) => {
    const { id } = params;
    return new Promise((resolve, reject) => {
      let query = `DELETE FROM users WHERE id=?`;
      db.query(query, id, (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject(err);
        }
      });
    });
  },
};

module.exports = userModels;
