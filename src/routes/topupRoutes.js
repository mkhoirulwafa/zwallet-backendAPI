const topupController = require("../controllers/topupController");
const router = require("express").Router();
const { authorization } = require("../middlewares/authorization");

router
  .get("/", topupController.getAllData)
  .post("/", topupController.postTopup)
  .patch("/:num", topupController.updateTopup)
  .delete("/:num", topupController.deleteTopup)

module.exports = router;
