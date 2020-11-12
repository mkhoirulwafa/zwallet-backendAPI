const db = require("../helpers/db");
const bcrypt = require("bcrypt");
// const upload = require("../middlewares/multer");
const query = require("../helpers/query");
require("dotenv").config();

const userModels = {
  getAllUsers: (queries) => {
    let { page, limit } = queries;
    !limit ? (limit = 8) : parseInt(limit);
    !page ? (page = 1) : parseInt(page);
    return query(
      `SELECT * FROM users ORDER BY CONCAT(firstName, ' ' ,lastName) LIMIT ? OFFSET ?`,
      [limit, (page - 1) * limit]
    );
  },
  getUserById: (params) => {
    const { id } = params;
    return query(`SELECT * FROM users WHERE id=?`, [id]);
  },
  checkUser: (id, email = null) => {
    return query(`SELECT * FROM users WHERE id=? OR email=?`, [id, email]);
  },
  getUserByEmail: (email) => {
    // const { email } = token;
    return query(`SELECT * FROM users WHERE email=?`, [email]);
  },
  getAllSearchUser: (id, queries) => {
    let { page, limit } = queries;
    !limit ? (limit = 5) : parseInt(limit);
    !page ? (page = 1) : parseInt(page);
    return query(
      `SELECT *, CONCAT(firstName, ' ', lastName) AS fullName FROM users WHERE NOT id=? ORDER BY CONCAT(firstName, ' ' ,lastName) LIMIT ${limit} OFFSET ${
        (page - 1) * limit
      }`,
      [id]
    );
  },
  getSearchUser: (id, queries) => {
    let { name, page, limit } = queries;
    !limit ? (limit = 5) : parseInt(limit);
    !page ? (page = 1) : parseInt(page);
    return query(
      `SELECT *, CONCAT(firstName, ' ', lastName) AS fullName FROM users 
        WHERE CONCAT(firstName, ' ', lastName) LIKE '${name}%' AND NOT id=? OR phone LIKE '${name}%' AND NOT id=? ORDER BY fullName LIMIT ${limit} OFFSET ${
          (page - 1) * limit
        }`,
      [id, id, limit, (page - 1) * limit]
    );
  },
  // getUserPagination: (queries) => {
  //   let { page, limit } = queries;
  //   return new Promise((resolve, reject) => {
  //     // console.log(queries.limit);
  //     !limit ? (limit = 2) : parseInt(limit);
  //     !page ? (page = 1) : parseInt(page);
  //     let query = `SELECT * FROM users LIMIT ${limit} OFFSET ${
  //       (page - 1) * limit
  //     }`;
  //     db.query(query, (err, res) => {
  //       if (!err) {
  //         resolve(res);
  //       } else {
  //         console.log(err);
  //       }
  //     });
  //   });
  // },
  postUser: (body) => {
    return query(`INSERT INTO users SET ?`, [body]);
  },
  updateUser: (id, email, body) => {
    return query(`UPDATE users SET ? WHERE id=? OR email=?`, [body, id, email]);
  },
  // uploadAvatar: (params, body) => {
  //   const { id, email } = params;
  //   return new Promise((resolve, reject) => {
  //     let query = `INSERT INTO users SET ? WHERE id=? OR email=?`;
  //     db.query(query, [body, id, email], (err, res) => {
  //       if (!err) {
  //         resolve(res);
  //       } else {
  //         reject(err);
  //       }
  //     });
  //   });
  // },
  deleteUser: (params) => {
    const { id } = params;
    return query(`DELETE FROM users WHERE id=?`, [id]);
  },
};

module.exports = userModels;
