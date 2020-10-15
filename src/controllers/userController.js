const userModel = require("../models/userModel");
const formResponse = require('../helpers/formResponse')

module.exports = {
  getAllUsers: (req, res) => {
    userModel
      .getAllUsers()
      .then((data) => formResponse(data, res, 200, "Success get All Users"))
      .catch((err) => formResponse('', res, 500, "Internal Server Error, Failed to get Users"));
  },
  getUserById: (req, res) => {
    userModel
      .getUserById(req.params)
      .then((data) => formResponse(data, res, 200, `Success Get User with id ${req.params.id}`))
      .catch((err) => formResponse('', res, 500, "Internal Server Error, Failed to get Users"));
  },
  getUserPagination: (req, res) => {
    userModel
      .getUserPagination(req.query)
      .then((data) => formResponse(data, res, 200, `Success Get users on page ${req.query.page} with limit ${req.query.limit}`))
      .catch((err) => formResponse('', res, 500, "Internal Server Error, Failed to get Users"));
  },
  postUser: (req, res) => {
    userModel
      .postUser(req.body)
      .then((data) => formResponse(data, res, 201, "Success create user"))
      .catch((err) => formResponse('', res, 404, "Not Found, Failed to create User"));
  },
  updateUser: (req, res) => {
    userModel
      .updateUser(req.params, req.body)
      .then((data) => formResponse(data, res, 201, `Success update users data with id ${req.params.id}`))
      .catch((err) => formResponse('', res, 401, "Failed to update data User"));
  },
  uploadAvatar: (req, res) => {
    userModel
      .uploadAvatar(req.params, req.body)
      .then((data) => formResponse(data, res, 201, `Success update users data with id ${req.params.id}`))
      .catch((err) => formResponse('', res, 401, "Failed to update data User"));
  },
  deleteUser: (req, res) => {
    userModel
      .deleteUser(req.params)
      .then((data) => formResponse(data, res, 200, `Success delete user with id ${req.params.id}`))
      .catch((err) => formResponse('', res, 401, "Failed to delete Users"));
  },
};