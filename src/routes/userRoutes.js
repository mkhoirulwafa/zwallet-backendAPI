const userController = require("../controllers/userController");
const router = require("express").Router();

const upload = require("../middlewares/multer");
const { authorization } = require("../middlewares/authorization");

router
  .get("/", authorization, userController.getAllUsers)
  .get("/search", userController.getSearchUser)
  .get("/:id", authorization, userController.getUserById)
  .patch("/", upload, userController.updateUser)
  .delete("/phone/:id", authorization, userController.deletePhoneUser)
  .delete("/:id", authorization, userController.deleteUser);

module.exports = router;
