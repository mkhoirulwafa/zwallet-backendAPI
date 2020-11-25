const db = require("../helpers/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const query = require("../helpers/query");
require("dotenv").config();

const authModels = {
  register: (body) => {
    return query(`INSERT INTO users SET ?`, [body]);
  },
  login: (body) => {
    const { email, password } = body;
    return query(
      `SELECT id, CONCAT(firstName, ' ', lastName) as fullName,balance, email, password, role_id FROM users WHERE email=?`,
      [email]
    );
  },
  checkDevice: (id) => {
    return query(`SELECT device_token FROM users where id=?`, [id]);
  },
};

module.exports = authModels;
