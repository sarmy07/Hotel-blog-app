const express = require("express");
const {
  getBlogs,
  createBlog,
  getBlog,
  updateBlog,
  deleteBlog,
  relatedBlogs,
} = require("../controllers/blogController");
const verifyToken = require("../middleware/verifyToken");
const verifyAdmin = require("../middleware/verifyAdmin");
const router = express.Router();

router.get("/", getBlogs);
router.post("/create-post", verifyToken, verifyAdmin, createBlog);
router.get("/:id", getBlog);
router.patch("/update-post/:id", verifyToken, verifyAdmin, updateBlog);
router.delete("/delete-post/:id", verifyToken, verifyAdmin, deleteBlog);
router.get("/related/:id", relatedBlogs);

module.exports = router;
