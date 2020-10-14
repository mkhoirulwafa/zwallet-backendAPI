const transferController = require("../controllers/transferController.js");
const router = require("express").Router();

const { authorization } = require("../middlewares/authorization");

router
  .get("/", transferController.getAllData)
  .get("/:id", transferController.getDataTransferById)
  .get("/search/:name",transferController.getSearch)
  .post("/", authorization, transferController.postTransfer)
  .patch("/:id", authorization, transferController.updateTransfer)
  .delete("/:id", authorization, transferController.deleteTransfer)

module.exports = router;
