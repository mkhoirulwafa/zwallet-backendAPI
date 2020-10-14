const authModel = require("../models/authModel");
const formResponse = require('../helpers/formResponse')

module.exports = {
  register: (req, res) => {
    authModel
      .register(req.body)
      .then((data) => formResponse(data, res, 201, "Register Success"))
      .catch((err) => formResponse('', res, 404, 'Failed to Register'));
  },
  login: (req, res) => {
    authModel
      .login(req.body)
      .then((data) => {
        formResponse(data, res, 200, 'Login Success')
      })
      .catch((err) => formResponse('', res, 404, "Login Failed, Email or Password wrong"));
  },
};