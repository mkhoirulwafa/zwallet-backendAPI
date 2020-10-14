const topupModel = require("../models/topupModel");
const formResponse = require('../helpers/formResponse')

module.exports = {
  getAllData: (req, res) => {
    topupModel
      .getAllData()
      .then((data) => formResponse(data, res, 200, "Success Get All Data Topup"))
      .catch((err) => formResponse('', res, 500, "Internal Server Error, Failed to get All data"));
  },
  postTopup: (req, res) => {
    topupModel
      .postTopup(req.body)
      .then((data) => formResponse(data, res, 201, "Success create data Topup"))
      .catch((err) => formResponse('', res, 404, "Not Found, Failed to create data Topup"));
  },
  updateTopup: (req, res) => {
    topupModel
      .updateTopup(req.params, req.body)
      .then((data) =>formResponse(data, res, 201, `Success Update data Topup number ${req.params.num}`))
      .catch((err) => formResponse('', res, 403, "Forbidden, Failed to Update data Topup"));
  },
  deleteTopup: (req, res) => {
    topupModel
      .deleteTopup(req.params)
      .then((data) => formResponse(data, res, 200, `Success Delete data topup number ${req.params.num}`))
      .catch((err) => formResponse('', res, 404, "Not Found, Failed to delete data topup"));
  },
};

//route manggil controller manggil model