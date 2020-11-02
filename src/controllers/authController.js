const authModel = require("../models/authModel");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const formResponse = require('../helpers/formResponse')
const bcrypt  = require('bcrypt')
require('dotenv').config()

module.exports = {
  register: async (req, res) => {
    const { email, password } = req.body;
    try {
      if (email && password) {
        const check = await userModel.getUserByEmail(email)
        if(check[0]) return formResponse("", res, 403, "Email already exists")
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(password, salt, async function (err, hashedPassword) {
            const newBody = { ...req.body, password: hashedPassword };
            const result = await authModel.register(newBody)
            if(result.affectedRows){
              const data = await userModel.getUserByEmail(email)
              formResponse(data, res, 201, "Register User Success")
            }
          });
        });
      }
    } catch (err) {
      formResponse("", res, 404, err.message)
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const login = await authModel.login(req.body)
      if(login[0]){
        const newData = login[0]
        const newBody = {
          id: newData.id,
          email: email,
          fullName: newData.fullName,
          role: newData.role_id
        }
        const hashed = bcrypt.compareSync(password, newData.password);
        if(hashed){
          const token = await jwt.sign(newBody, process.env.SECRET_KEY)
          let result = {...newBody, token: token}
          return formResponse(result, res, 201, 'Login Success')
        }else{
          return formResponse('', res, 403, `Email or Password wrong`)
        }
      }
      return formResponse('', res, 403, `Email or Password wrong`)
    } catch (err) {return formResponse('', res, 404, err.message)}
  },
  checkEmail: async (req, res)=>{
    const {email} = req.body
    try {
      const check = await userModel.checkUser(null, email)
      if(check[0]){
        return formResponse(check[0], res, 200, 'Email is Registered, Proceed to reset')
      }
    } catch (err) {
      return formResponse('', res, 403, `Email is Invalid`)
    }
  },
  resetPassword: async (req, res) => {
    const { password } = req.body;
    try {
      const check = await userModel.checkUser(null, email)
      if(check[0]){
        delete req.body.email
        const result = await userModel.updateUser(check[0].id, check[0].email, req.body)
        if (result.affectedRows) {
          const datas = await userModel.checkUser(check[0].id);
          formResponse(datas, res, 201, `Password Changed Successfully`);
        }
        formResponse(result, res, 201, 'Login Success')
        const newData = check[0]
        const newBody = {
          id: newData.id,
          email: email,
          fullName: newData.fullName,
          role: newData.role_id
        }
        const hashed = bcrypt.compareSync(password, newData.password);
        if(hashed){
          const token = await jwt.sign(newBody, process.env.SECRET_KEY)
          let result = {...newBody, token: token}
          return formResponse(result, res, 201, 'Login Success')
        }else{
          return formResponse('', res, 403, `Email or Password wrong`)
        }
      }
      return formResponse('', res, 403, `Email or Password wrong`)
    } catch (err) {return formResponse('', res, 404, err.message)}
  },
};