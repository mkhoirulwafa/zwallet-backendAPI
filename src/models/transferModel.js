const db = require("../helpers/db");
const bcrypt = require("bcrypt");

const transferModel = {
  getAllData: () => {
    return new Promise((resolve, reject) => {
      let query = `SELECT transfer.*, CONCAT(p1.firstName, ' ', p1.lastName) AS sender_name, p1.avatar AS sender_avatar, p1.phone AS sender_phone,
      CASE WHEN transfer.receiver_name = '' THEN CONCAT(p2.firstName, ' ', p2.lastName) ELSE transfer.receiver_name END AS receiver_name,
      CASE WHEN transfer.receiver_avatar = '' THEN p2.avatar ELSE transfer.receiver_avatar END AS receiver_avatar,
      p2.phone AS receiver_phone FROM transfer
      LEFT OUTER JOIN users AS p1 ON transfer.sender_id = p1.id
      LEFT OUTER JOIN users AS p2 ON transfer.receiver_id = p2.id`;
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
      p2.phone AS receiver_phone FROM transfer WHERE transfer.sender_id=? OR transfer.receiver_id=?
      LEFT OUTER JOIN users AS p1 ON transfer.sender_id = p1.id 
      LEFT OUTER JOIN users AS p2 ON transfer.receiver_id = p2.id`;
      db.query(query, [id, id], (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject(err);
        }
      });
    });
  },
  getSearch: (params) => {
    let { name } = params;
    //query
    return new Promise((resolve, reject) => {
      let query2 = `SELECT CONCAT(firstName, ' ', lastName) AS fullName, phone, avatar FROM users WHERE firstName LIKE '${name}%' OR lastName LIKE '%${name}%' ORDER BY firstName OR lastName`;
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