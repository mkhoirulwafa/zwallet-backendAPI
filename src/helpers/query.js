const db = require("../helpers/db");

const query = (query, payload = null) => {
    return new Promise((resolve, reject) => {
      db.query(query, payload, (err, result) => {
        if (err) reject(err)
        resolve(result)
      })
    })
  }
  
  module.exports = query