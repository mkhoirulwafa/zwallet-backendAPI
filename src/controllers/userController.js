const userModel = require("../models/userModel");
const formResponse = require("../helpers/formResponse");
const { verify, decode } = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

module.exports = {
  getAllUsers: (req, res) => {
    userModel
      .getAllUsers(req.query)
      .then((data) => formResponse(data, res, 200, "Success get All Users"))
      .catch((err) =>
        formResponse("", res, 500, "Internal Server Error, Failed to get Users")
      );
  },
  getSearchUser: (req, res) => {
    const bearerToken = req.headers["token"].split(" ")[1];
    const decoded = verify(bearerToken, process.env.SECRET_KEY);
    if (!req.query.name && !req.query.phone) {
      userModel
        .getAllSearchUser(decoded.id, req.query)
        .then((data) =>
          formResponse(data, res, 200, `Success Get User with search`)
        )
        .catch((err) =>
          formResponse(
            "",
            res,
            500,
            `Internal Server Error, Failed to get User with search tanpa query ${req.query.limit}`
          )
        );
    } else if (req.query.name || req.query.phone) {
      userModel
        .getSearchUser(decoded.id, req.query)
        .then((data) =>
          formResponse(data, res, 200, `Success Get User with search`)
        )
        .catch((err) =>
          formResponse(
            "",
            res,
            500,
            "Internal Server Error, Failed to get User with search"
          )
        );
    }
  },
  getUserById: (req, res) => {
    userModel
      .getUserById(req.params)
      .then((data) =>
        formResponse(
          data[0],
          res,
          200,
          `Success Get User with id ${req.params.id}`
        )
      )
      .catch((err) =>
        formResponse("", res, 500, "Internal Server Error, Failed to get User")
      );
  },
  getUserByEmail: (req, res) => {
    userModel
      .getUserByEmail(req.params)
      .then((data) =>
        formResponse(
          data[0],
          res,
          200,
          `Success Get User with email ${req.params.email}`
        )
      )
      .catch((err) =>
        formResponse("", res, 500, "Internal Server Error, Failed to get User")
      );
  },
  postUser: async (req, res) => {
    const { email, password } = req.body;
    try {
      if (email && password) {
        const check = await userModel.getUserByEmail(email)
        if(check[0]) return formResponse("", res, 403, "Email already exists")
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(password, salt, async function (err, hashedPassword) {
            const newBody = { ...req.body, password: hashedPassword };
            const result = await userModel.postUser(newBody)
            if(result.affectedRows){
              const data = await userModel.getUserByEmail(email)
              formResponse(data, res, 201, "Register User Success")
            }
          });
        });
      }
    } catch (err) {
      formResponse("", res, 404, err)
    }
  },
  updateUser: async (req, res) => {
    const bearerToken = req.headers["token"].split(" ")[1];
    const decoded = verify(bearerToken, process.env.SECRET_KEY);
    const { currentPassword, password, currentPin, pin } = req.body;
    let newBody = req.body;
    try {
      // UPLOAD IMAGE
      if (req.file) {
        newBody.avatar = `${process.env.BASE_URI}/images/${req.file.filename}`;
        if (req.body.firstName || req.body.lastName) {
          newBody.firstName = req.body.firstName;
          newBody.lastName = req.body.lastName;
        }
      }
      // CHANGE PASSWORD
      if (currentPassword && password) {
        const result = await userModel.checkUser(decoded.id);
        const check = await bcrypt.compare(currentPassword, result[0].password);
        if (check) {
          const salt = bcrypt.genSaltSync(10);
          const hash = bcrypt.hashSync(password, salt);
          newBody.password = hash;
          delete newBody.currentPassword;
        } else {
          return formResponse("", res, 403, "Wrong Current Password");
        }
      }
      //CHANGE PIN
      if (pin) {
        // const result = await userModel.checkUser(decoded.id);
        // if (currentPin.length != 6) formResponse("", res, 400, `PIN must be fulfilled`);
        // if (currentPin != result[0].pin) formResponse("", res, 400, `Invalid PIN`);
        if (pin.length != 6) formResponse("", res, 400, `New PIN must be fulfilled`);
        
        newBody.pin = pin;
        delete newBody.currentPin;
      }
      // CHANGE PHONE
      if (req.body.phone) {
        newBody.phone = req.body.phone;
      }
      if(req.body.device_token){
        newBody.device_token = req.body.device_token;
      }
      // UPDATE DATABASE
      const result = await userModel.updateUser(
        decoded.id,
        decoded.email,
        newBody
      );
      if (result.affectedRows) {
        const datas = await userModel.checkUser(decoded.id);
        formResponse(datas, res, 201, `User successfully edited`);
      }
    } catch (err) {
      // console.log(err);
      return formResponse("", res, 400, err);
    }
  },
  changeUserPin: async (req, res) => {
    const bearerToken = req.headers["token"].split(" ")[1];
    const decoded = verify(bearerToken, process.env.SECRET_KEY);
    const { currentPin, pin } = req.body;
    const newBody = req.body;
    try {
      const result = await userModel.checkUser(decoded.id);
      if (currentPin.length != 6) {
        formResponse("", res, 400, `PIN must be fulfilled`);
      } else if (currentPin != result[0].pin) {
        formResponse("", res, 400, `Invalid PIN`);
      }
      newBody.pin = pin;
      delete newBody.currentPin;
      const data = await userModel.updateUser(
        decoded.id,
        decoded.email,
        newBody
      );
      if (data.affectedRows) {
        const datas = await userModel.checkUser(decoded.id);
        formResponse(datas, res, 201, `Pin Changed Successfully`);
      }
    } catch (err) {
      formResponse("", res, 400, err);
    }
  },
  deleteUser: async (req, res) => {
    try{
      const result = await userModel.deleteUser(req.params)
      if(result.affectedRows) formResponse( data, res, 200, `Success delete user with id ${req.params.id}` )
    }
    catch(err) {formResponse("", res, 401, "Failed to delete Users")}
  },
};
