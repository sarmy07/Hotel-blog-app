const express = require("express");
const {
  register,
  login,
  logout,
  getAllUsers,
  deleteUser,
  updateUser,
} = require("../controllers/authController");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);
router.put("/users/:id", updateUser);

module.exports = router;
