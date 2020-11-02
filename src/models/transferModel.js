const db = require("../helpers/db");
const bcrypt = require("bcrypt");

const transferModel = {
  getAllData: () => {
    return new Promise((resolve, reject) => {
      let query = `SELECT transfer.*, CONCAT(p1.firstName, ' ', p1.lastName) AS sender_name, p1.avatar AS sender_avatar, p1.phone AS sender_phone,
      CASE WHEN transfer.receiver_name = '' THEN CONCAT(p2.firstName, ' ', p2.lastName) ELSE transfer.receiver_name END AS receiver_name,
      CASE WHEN transfer.receiver_avatar = '' THEN p2.avatar ELSE transfer.receiver_avatar END AS receiver_avatar,
      p2.phone AS receiver_phone FROM transfer
      INNER JOIN users AS p1 ON transfer.sender_id = p1.id
      INNER JOIN users AS p2 ON transfer.receiver_id = p2.id`;
      db.query(query, (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject(err);
        }
      });
    });
  },
  getDataTransferById: (params) => {
    const {id}= params
    return new Promise((resolve, reject) => {
      let query = `SELECT transfer.*, CONCAT(p1.firstName, ' ', p1.lastName) AS sender_name, p1.avatar AS sender_avatar, p1.phone AS sender_phone,
      CASE WHEN transfer.receiver_name = '' THEN CONCAT(p2.firstName, ' ', p2.lastName) ELSE transfer.receiver_name END AS receiver_name,
      CASE WHEN transfer.receiver_avatar = '' THEN p2.avatar ELSE transfer.receiver_avatar END AS receiver_avatar,
      p2.phone AS receiver_phone FROM transfer
      INNER JOIN users AS p1 ON transfer.sender_id = p1.id
      INNER JOIN users AS p2 ON transfer.receiver_id = p2.id WHERE transfer.sender_id =? OR transfer.receiver_id=?`;
      db.query(query, [id, id], (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject(err);
        }
      });
    });
  },
  getAllSearch: (params, queries) => {
    let { page, limit } = queries;
    const {id} = params
    //query
    return new Promise((resolve, reject) => {
      !limit ? (limit = 5) : parseInt(limit);
      !page ? (page = 1) : parseInt(page);
      let query2 = `SELECT id, CONCAT(firstName, ' ', lastName) AS fullName, phone, avatar FROM users LIMIT ${limit} OFFSET ${(page - 1) * limit}`;
      db.query(query2, (err, res, fields) => {
        //catch err
        if (!err) {
          resolve(res);
        } else {
          reject(err);
        }
      });
    });
  },
  getSearch: (params, queries) => {
    let { id } = params;
    let { name, page, limit } = queries;
    //query
    return new Promise((resolve, reject) => {
      !limit ? (limit = 5) : parseInt(limit);
      !page ? (page = 1) : parseInt(page);
      let query2 = `SELECT id, CONCAT(firstName, ' ', lastName) AS fullName, phone, avatar FROM users 
                  WHERE CONCAT(firstName, ' ', lastName) LIKE '${name}%' AND NOT id=${id} ORDER BY fullName LIMIT ${limit} OFFSET ${(page - 1) * limit}`;
      db.query(query2, (err, res, fields) => {
        //catch err
        if (!err) {
          resolve(res);
        } else {
          reject(err);
        }
      });
    });
  },
  postTransfer: (body) => {
    // const { number, title, description } = body;
    return new Promise((resolve, reject) => {
      if (body) {
        let query = `INSERT INTO transfer SET ?`;
        db.query(query, body, (err, res) => {
          if (!err) {
            resolve(body);
          } else {
            reject(err);
          }
        });
      } else {
        reject(err);
      }
    });
  },
  updateTransfer: (params, body) => {
    const { id } = params;
    return new Promise((resolve, reject) => {
        let query = `UPDATE transfer SET ? WHERE id=?`;
        db.query(query, [body, id], (err, res) => {
          if (res.affectedRows) {
            resolve(body);
          } else {
            reject(err);
          }
        });
    });
  },
  deleteTransfer: (params) => {
    const { id } = params;
    return new Promise((resolve, reject) => {
      let query = `DELETE FROM transfer WHERE id=?`;
      db.query(query, id, (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject("Failed to Delete transfer");
        }
      });
    });
  },
};

module.exports = transferModel;