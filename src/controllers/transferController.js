const transferModel = require("../models/transferModel");
const formResponse = require('../helpers/formResponse')

module.exports = {
  getAllData: (req, res) => {
    transferModel
      .getAllData()
      .then((data) => formResponse(data, res, 200, "Success get All Transfer"))
      .catch((err) => formResponse('', res, 500, "Internal Server Error, Failed to get data"));
  },
  getDataTransferById: (req, res) => {
    transferModel
      .getDataTransferById(req.params)
      .then((data) => formResponse(data, res, 200, `Success get Data Transfer with id ${req.params.id}`))
      .catch((err) => formResponse('', res, 500, "Internal Server Error, Failed to get data"));
  },
  getSearch: (req, res) => {
    transferModel
      .getSearch(req.params)
      .then((data) => formResponse(data, res, 200, `Success get user(s) Result from keyword ${req.params.key}`))
      .catch((err) => formResponse('', res, 500, "Internal Server Error, Failed to get result"));
  },
  postTransfer: (req, res) => {
    transferModel
      .postTransfer(req.body)
      .then((data) => formResponse(data, res, 201, "Success create transfer"))
      .catch((err) => formResponse('', res, 404, "Not Found, Failed to create transfer"));
  },
  updateTransfer: (req, res) => {
    transferModel
      .updateTransfer(req.params, req.body)
      .then((data) =>formResponse(data, res, 201, `Success update Transfer data with id ${req.params.id}`))
      .catch((err) => formResponse('', res, 403, "Forbidden, Failed to Update data"));
  },
  deleteTransfer: (req, res) => {
    transferModel
      .deleteTransfer(req.params)
      .then((data) => formResponse(data, res, 200, `Success delete transfer data with id ${req.params.id}`))
      .catch((err) => formResponse('', res, 401, "Failed to delete Data"));
  },
};