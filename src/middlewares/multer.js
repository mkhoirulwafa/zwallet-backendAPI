const multer = require("multer");

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

module.exports =  multer({ storage, limits, fileFilter }).single("avatar");