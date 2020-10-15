const multer = require("multer");
const path = require("path");
require("dotenv").config();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    const newFileName = `zwallet-${Date.now()}-${file.originalname}`;
    cb(null, newFileName);
  },
});
const fileFilter = (req, file, cb) => {
  // const mime = /jpg|webp|gif|png|jpeg|svg/;
  // const extName = mime.test(path.extname(file.originalname).toLowerCase());
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const limits = {
  fileSize: 10 * 1024 * 1024,
};

const upload = (req, res, next) => {
  let uploaded = multer({ storage, limits, fileFilter }).single("avatar");
  uploaded(req, res, function (err) {
    // console.log(req.file)

    //Err Handling
    if (req.fileValidationError) {
      return res.send(req.fileValidationError);
    } else if (!req.file) {
      return res.send("Please select an image to upload");
    } else if (err instanceof multer.MulterError) {
      return res.send(err);
    } else if (err) {
      return res.send(err);
    }

    // Display uploaded image for user validation
    res.send({
      status: 201,
      message: "Uploaded Successfully",
      image: `${process.env.BASE_URI}/images/${req.file.filename}`,
    });
    req.headers.imagePath = `${process.env.BASE_URI}/images/${req.file.filename}`
    // console.log(req.headers)
    // next()
  });
};

module.exports = upload;
