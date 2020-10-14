const userController = require("../controllers/userController");
const router = require("express").Router();

const { authorization } = require("../middlewares/authorization");
const upload = require("../middlewares/multer");

router
  .get("/", userController.getAllUsers)
  .get("/history", authorization, userController.getUserPagination)
  .get("/:id", authorization, userController.getUserById)
  .post("/", authorization, userController.postUser)
  .patch("/:id", upload, authorization, userController.updateUser)
  .delete("/:id", authorization, userController.deleteUser)

module.exports = router;
