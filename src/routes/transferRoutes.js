const transferController = require("../controllers/transferController.js");
const router = require("express").Router();

const { authorization } = require("../middlewares/authorization");

router
  .get("/", authorization, transferController.getAllData)
  .get("/history/:id",authorization, transferController.getDataTransferById)
  .post("/", transferController.postTransfer)
  .patch("/:id", authorization, transferController.updateTransfer)
  .delete("/:id", authorization, transferController.deleteTransfer)

module.exports = router;
