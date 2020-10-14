const topupController = require("../controllers/topupController");
const router = require("express").Router();
const { authorization } = require("../middlewares/authorization");

router
  .get("/", topupController.getAllData)
  .post("/", authorization, topupController.postTopup)
  .patch("/:num", authorization, topupController.updateTopup)
  .delete("/:num", authorization, topupController.deleteTopup)

module.exports = router;
