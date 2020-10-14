const db = require("../helpers/db");
const bcrypt = require("bcrypt");

const topupModel = {
  getAllData: () => {
    return new Promise((resolve, reject) => {
      let query = `SELECT * FROM topup ORDER BY number + 0`;
      db.query(query, (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject(err)
        }
      });
    });
  },
  postTopup: (body) => {
    const { number, title, description } = body;
    return new Promise((resolve, reject) => {
      if (number && title && description) {
        let query = `INSERT INTO topup SET ?`;
        db.query(query, body, (err, res) => {
          if (!err) {
            resolve(body);
          } else {
            reject(err);
          }
        });
      } else {
        reject('Form must be fulfilled');
      }
    });
  },
  updateTopup: (params, body) => {
    const { num } = params;
    const { title = "", description = "" } = body;
    return new Promise((resolve, reject) => {
      if (title.trim() || description.trim()) {
        let query = `UPDATE topup SET ? WHERE number=?`;
        db.query(query, [body, num], (err, res) => {
          if (res.affectedRows) {
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
  deleteTopup: (params) => {
    const { num } = params;
    return new Promise((resolve, reject) => {
      let query = `DELETE FROM topup WHERE number=?`;
      db.query(query, num, (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject(err);
        }
      });
    });
  },
};

module.exports = topupModel;
