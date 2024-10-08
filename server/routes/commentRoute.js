const express = require("express");
const {
  createComment,
  getComments,
} = require("../controllers/commentController");
const router = express.Router();

router.get("/total-comments", getComments);

router.post("/post-comment", createComment);

module.exports = router;
