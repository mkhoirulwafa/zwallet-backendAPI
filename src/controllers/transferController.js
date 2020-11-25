const transferModel = require("../models/transferModel");
const formResponse = require("../helpers/formResponse");
const { checkUser, updateUser } = require("../models/userModel");
const admin = require("firebase-admin");

module.exports = {
  getAllData: (req, res) => {
    transferModel
      .getAllData(req.query)
      .then((data) => formResponse(data, res, 200, "Success get All Transfer"))
      .catch((err) =>
        formResponse("", res, 500, "Internal Server Error, Failed to get data")
      );
  },
  getDataTransferById: (req, res) => {
    const { start_date, end_date, income, expense, week } = req.query;
    if (!start_date && !end_date && !income && !expense && !week) {
      transferModel
        .getDataTransferById(req.params, req.query)
        .then((data) =>
          formResponse(
            data,
            res,
            200,
            `Success get Data Transfer with id ${req.params.id}`
          )
        )
        .catch((err) =>
          formResponse(
            "",
            res,
            500,
            "Internal Server Error, Failed to get data"
          )
        );
    } else if (start_date && end_date && !income && !expense && !week) {
      transferModel
        .getDataTransferByIdFilter(req.params, req.query)
        .then((data) =>
          formResponse(
            data,
            res,
            200,
            `Success get Data Transfer with filter dateRange, ${req.query.start_date}`
          )
        )
        .catch((err) =>
          formResponse(
            "",
            res,
            500,
            "Internal Server Error, Failed to get data"
          )
        );
    } else if (week && !start_date && !end_date && !income && !expense) {
      transferModel
        .getDataTransferByIdFilterWeek(req.params, req.query)
        .then((data) =>
          formResponse(
            data,
            res,
            200,
            `Success get Data Transfer with filter week`
          )
        )
        .catch((err) =>
          formResponse(
            "",
            res,
            500,
            "Internal Server Error, Failed to get data"
          )
        );
    } else if (expense && !income && !start_date && !end_date && !week) {
      transferModel
        .getDataTransferByIdFilterExpense(req.params, req.query)
        .then((data) =>
          formResponse(
            data,
            res,
            200,
            `Success get Data Transfer with filter Expense`
          )
        )
        .catch((err) =>
          formResponse(
            "",
            res,
            500,
            "Internal Server Error, Failed to get data"
          )
        );
    } else if (income && !expense && !start_date && !end_date && !week) {
      transferModel
        .getDataTransferByIdFilterIncome(req.params, req.query)
        .then((data) =>
          formResponse(
            data,
            res,
            200,
            `Success get Data Transfer with filter Income`
          )
        )
        .catch((err) =>
          formResponse(
            "",
            res,
            500,
            "Internal Server Error, Failed to get data"
          )
        );
    }
  },
  postTransfer: async (req, res) => {
    const { sender_id, receiver_id, amount } = req.body;
    if (sender_id == receiver_id)
      return formResponse(
        "",
        res,
        401,
        "You cannot Transfer Balance to yourself"
      );
    try {
      const checkSender = await checkUser(sender_id, null);
      if (!checkSender.length) {
        return formResponse("", res, 401, "Cannot Transfer Without Sender");
      }
      const checkReceiver = await checkUser(receiver_id, null);
      if (!checkReceiver.length) {
        return formResponse("", res, 401, "Receiver Not Found");
      }
      const currentBalanceSender = Number(checkSender[0].balance);
      const currentBalanceReceiver = Number(checkReceiver[0].balance);
      if (currentBalanceSender < Number(amount))
        return formResponse("", res, 401, "Your balance isn't enough");

      const balanceSender = String(currentBalanceSender - Number(amount));
      const balanceReceiver = String(currentBalanceReceiver + Number(amount));
      await updateUser(sender_id, null, {
        balance: balanceSender,
      });
      await updateUser(receiver_id, null, {
        balance: balanceReceiver,
      });

      const data = await transferModel.postTransfer(req.body);
      formResponse(
        data,
        res,
        201,
        `Transfer Success from id ${sender_id} to id ${receiver_id}`
      );
      const device_token_receiver = checkReceiver[0].device_token;
      const device_token_sender = checkSender[0].device_token;
      await admin.messaging().sendToDevice(device_token_receiver, {
        notification: {
          title: "Transfer Received",
          body: `You've been transferred Rp${amount} by ${checkSender[0].firstName}`,
          badge: "1",
        },
      });
      // console.log(`success pass notif to receiver`)
      // .then(()=>{
      //   console.log(`success pass notif to receiver`)
      //   admin.messaging().sendToDevice(device_token_receiver, {
      //     notification: {
      //       title: "Transfer Received",
      //       body: `You've been transferred Rp${amount} by ${checkSender[0].firstName}`,
      //       badge: '1',
      //     }
      //   })
      //   console.log(`success pass notif to sender`)
      // })
    } catch (err) {
      return formResponse(
        "",
        res,
        404,
        // "Not Found, Failed to process the transfer"
        err.message
      );
    }
  },
  updateTransfer: (req, res) => {
    transferModel
      .updateTransfer(req.params, req.body)
      .then((data) =>
        formResponse(
          data,
          res,
          201,
          `Success update Transfer data with id ${req.params.id}`
        )
      )
      .catch((err) =>
        formResponse("", res, 403, "Forbidden, Failed to Update data")
      );
  },
  deleteTransfer: (req, res) => {
    transferModel
      .deleteTransfer(req.params)
      .then((data) =>
        formResponse(
          data,
          res,
          200,
          `Success delete transfer data with id ${req.params.id}`
        )
      )
      .catch((err) => formResponse("", res, 401, "Failed to delete Data"));
  },
};
