const db = require("../helpers/db");
const bcrypt = require("bcrypt");

const transferModel = {
  getAllData: (queries) => {
    let { limit, page } = queries;
    !limit ? (limit = 5) : parseInt(limit);
    !page ? (page = 1) : parseInt(page);
    return new Promise((resolve, reject) => {
      let query = `SELECT transfer.*, CONCAT(p1.firstName, ' ', p1.lastName) AS sender_name, p1.avatar AS sender_avatar, p1.phone AS sender_phone,
      CASE WHEN transfer.receiver_name = '' THEN CONCAT(p2.firstName, ' ', p2.lastName) ELSE transfer.receiver_name END AS receiver_name,
      CASE WHEN transfer.receiver_avatar = '' THEN p2.avatar ELSE transfer.receiver_avatar END AS receiver_avatar,
      p2.phone AS receiver_phone FROM transfer
      INNER JOIN users AS p1 ON transfer.sender_id = p1.id
      INNER JOIN users AS p2 ON transfer.receiver_id = p2.id LIMIT ? OFFSET ?`;
      db.query(query, [limit, (page - 1) * limit], (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject(err);
        }
      });
    });
  },
  getDataTransferById: (params, queries) => {
    const { id } = params;
    let { limit, page } = queries;
    !page ? (page = 1) : parseInt(page);
    !limit ? (limit = 5) : parseInt(limit);

    return new Promise((resolve, reject) => {
      let query = `SELECT transfer.*, CONCAT(p1.firstName, ' ', p1.lastName) AS sender_name, p1.avatar AS sender_avatar, p1.phone AS sender_phone,
      CONCAT(p2.firstName, ' ', p2.lastName) AS receiver_name,
      p2.avatar AS receiver_avatar,
      p2.phone AS receiver_phone FROM transfer
      INNER JOIN users AS p1 ON transfer.sender_id = p1.id
      INNER JOIN users AS p2 ON transfer.receiver_id = p2.id WHERE transfer.sender_id =? OR transfer.receiver_id=? ORDER BY transfer.dateTime DESC LIMIT ${limit} OFFSET ${
        (page - 1) * limit
      }`;
      db.query(query, [id, id], (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject(err);
        }
      });
    });
  },
  getDataTransferByIdFilter: (params, queries) => {
    //by date range
    const { id } = params;
    let { start_date, end_date, limit, page } = queries;
    !limit ? (limit = 5) : parseInt(limit);
    !page ? (page = 1) : parseInt(page);
    return new Promise((resolve, reject) => {
      let query = `SELECT transfer.*, CONCAT(p1.firstName, ' ', p1.lastName) AS sender_name, p1.avatar AS sender_avatar, p1.phone AS sender_phone,
      CONCAT(p2.firstName, ' ', p2.lastName) AS receiver_name,
      p2.avatar AS receiver_avatar,
      p2.phone AS receiver_phone FROM transfer
      INNER JOIN users AS p1 ON transfer.sender_id = p1.id
      INNER JOIN users AS p2 ON transfer.receiver_id = p2.id WHERE (transfer.sender_id =? AND (transfer.dateTime BETWEEN '${start_date}' AND '${end_date}')) OR (transfer.receiver_id =? AND (transfer.dateTime BETWEEN '${start_date}' AND '${end_date}')) ORDER BY transfer.dateTime DESC LIMIT ${limit} OFFSET ${
        (page - 1) * limit
        // let query = `SELECT dateTime from transfer WHERE dateTime BETWEEN '${start_date}' and '${end_date}' ORDER BY dateTime DESC`
      }`;
      db.query(query, [id, id], (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject(err);
        }
      });
    });
  },
  getDataTransferByIdFilterWeek: (params, queries) => {
    const { id } = params;
    let { limit, page } = queries;
    !limit ? (limit = 2) : parseInt(limit);
    !page ? (page = 1) : parseInt(page);
    return new Promise((resolve, reject) => {
      let query = `SELECT transfer.*, CONCAT(p1.firstName, ' ', p1.lastName) AS sender_name, p1.avatar AS sender_avatar, p1.phone AS sender_phone,
      CONCAT(p2.firstName, ' ', p2.lastName) AS receiver_name,
      p2.avatar AS receiver_avatar,
      p2.phone AS receiver_phone FROM transfer
      INNER JOIN users AS p1 ON transfer.sender_id = p1.id
      INNER JOIN users AS p2 ON transfer.receiver_id = p2.id WHERE transfer.sender_id =? OR transfer.receiver_id=? AND WEEK(transfer.dateTime) = WEEK(CURDATE())  ORDER BY transfer.dateTime DESC  LIMIT ${limit} OFFSET ${
        (page - 1) * limit
      }`;
      db.query(query, [id, id], (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject(err);
        }
      });
    });
  },
  getDataTransferByIdFilterIncome: (params, queries) => {
    //by date range
    const { id } = params;
    let { limit, page } = queries;
    !limit ? (limit = 5) : parseInt(limit);
    !page ? (page = 1) : parseInt(page);
    return new Promise((resolve, reject) => {
      let query = `SELECT transfer.*, CONCAT(p1.firstName, ' ', p1.lastName) AS sender_name, p1.avatar AS sender_avatar, p1.phone AS sender_phone,
      CONCAT(p2.firstName, ' ', p2.lastName) AS receiver_name,
      p2.avatar AS receiver_avatar,
      p2.phone AS receiver_phone FROM transfer
      INNER JOIN users AS p1 ON transfer.sender_id = p1.id
      INNER JOIN users AS p2 ON transfer.receiver_id = p2.id WHERE transfer.receiver_id=? ORDER BY transfer.dateTime DESC LIMIT ${limit} OFFSET ${(page - 1) * limit}`;
      db.query(query, [id], (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject(err);
        }
      });
    });
  },
  getDataTransferByIdFilterExpense: (params, queries) => {
    //by date range
    const { id } = params;
    let { limit, page } = queries;
    !limit ? (limit = 5) : parseInt(limit);
    !page ? (page = 1) : parseInt(page);
    return new Promise((resolve, reject) => {
      let query = `SELECT transfer.*, CONCAT(p1.firstName, ' ', p1.lastName) AS sender_name, p1.avatar AS sender_avatar, p1.phone AS sender_phone,
      CONCAT(p2.firstName, ' ', p2.lastName) AS receiver_name,
      p2.avatar AS receiver_avatar,
      p2.phone AS receiver_phone FROM transfer
      INNER JOIN users AS p1 ON transfer.sender_id = p1.id
      INNER JOIN users AS p2 ON transfer.receiver_id = p2.id WHERE transfer.sender_id=? ORDER BY transfer.dateTime DESC LIMIT ${limit} OFFSET ${(page - 1) * limit}`;
      db.query(query, [id], (err, res) => {
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
