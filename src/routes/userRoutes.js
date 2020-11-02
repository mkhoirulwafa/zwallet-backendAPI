const userController = require("../controllers/userController");
const router = require("express").Router();

const upload = require("../middlewares/multer");

router
  .get("/", userController.getAllUsers)
  .get("/search", userController.getSearchUser)
  .get("/:id", userController.getUserById)
  .post("/", userController.postUser)
  .patch("/", upload, userController.updateUser)
  .delete("/:id", userController.deleteUser);

module.exports = router;
