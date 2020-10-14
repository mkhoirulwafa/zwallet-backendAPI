const uploadModel = require("../models/uploadModel");
const formResponse = require("../helpers/formResponse");
require('dotenv').config();
const path = require("path");
const multer = require("multer");

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    const newFileName = `${Date.now()}-${file.originalname}`;
    cb(null, newFileName);
  },
});

let limits = {
  fileSize: 10 * 1024 * 1024, //10MB
};

let fileFilter = (req, file, cb) => {
  const mime = /jpg|webp|gif|png|jpeg|svg/;
  const extName = mime.test(path.extname(file.originalname).toLowerCase());
  if (extName) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let upload = multer({ storage, limits, fileFilter });

const uploadController = (req, res) => {
  const uploadImage = upload.single("image")
  uploadImage(req, res, (err) => {
    if (!req.file) {
      console.log(req.file)
        formResponse('', res, 400, "File must be an image")
      }else{
          if (!err) {
            formResponse(`${process.env.BASE_URI}/images/${req.file.filename}`, res, 201, "Success upload an Image")
          } else {
            formResponse('', res, 400, "Upload image failed")
          }
      }
    });
}

module.exports = uploadController