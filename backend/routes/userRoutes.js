const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const {
  createUser,
  getAllUsers,
  getUserById,
  login,
  updateUserById,
  deleteUser,
} = require("../controllers/userController");

router.post("/users", createUser);
router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.put("/users/:id", updateUserById);
router.post("/login", login);
router.delete("/users/:id", deleteUser);

module.exports = router;
