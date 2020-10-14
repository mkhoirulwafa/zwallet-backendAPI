const uploadController = require("../controllers/uploadController");
const router = require("express").Router();
const { authorization } = require("../middlewares/authorization");
const upload = require("../middlewares/multer");

router
  .post("/", upload, authorization, uploadController)

module.exports = router;