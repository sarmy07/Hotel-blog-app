const Blog = require("../models/Blog");
const Comment = require("../models/Comment");

const getBlogs = async (req, res) => {
  try {
    // ! very important learn more
    const { search, category, location } = req.query;
    console.log(search);

    let query = {};

    if (search) {
      query = {
        ...query,
        $or: [
          { title: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
          { content: { $regex: search, $options: "i" } },
        ],
      };
    }

    if (category) {
      query = {
        ...query,
        category,
      };
    }

    if (location) {
      query = {
        ...query,
        location,
      };
    }

    const blogs = await Blog.find(query)
      .populate("author", "email")
      .sort({ createdAt: -1 });
    return res.status(200).json(blogs);
  } catch (error) {
    console.log(error);
  }
};

const createBlog = async (req, res) => {
  try {
    const { title, content, category, coverImg } = req.body;
    const newBlog = await Blog.create({ ...req.body, author: req.user.id });
    return res.status(200).json(newBlog);
  } catch (error) {
    console.error(error);
  }
};

const getBlog = async (req, res) => {
  const blogId = req.params.id;
  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json("No Post found");
    }

    // also fetch comments related to the posts
    const comments = await Comment.find({ blogId: blogId }).populate(
      "user",
      "username, email"
    );
    return res.status(200).json({ blog, comments });
  } catch (error) {
    console.log(error);
  }
};

const updateBlog = async (req, res) => {
  const blogId = req.params.id;
  try {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      { ...req.body },
      { new: true }
    );
    if (!blog) {
      return res.status(404).json("No blog Found");
    }

    return res.status(200).json(blog);
  } catch (error) {
    console.log(error);
  }
};

const deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await Blog.findByIdAndDelete(blogId);
    if (!blog) {
      return res.status(404).json("No blog Found");
    }

    // delete related comments to the blog post
    await Comment.deleteMany({ blogId: blogId });

    return res.status(200).json("blog deleted");
  } catch (error) {
    console.log(error);
  }
};

const relatedBlogs = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json("blog id is required");
    }

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json("No blog found");
    }

    const titleRegex = new RegExp(blog.title.split(" ").join("|"), "i");
    const relatedQuery = {
      _id: { $ne: id },
      title: { $regex: titleRegex },
    };

    const relatedBlogs = await Blog.find(relatedQuery);
    return res.status(200).json(relatedBlogs);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
  relatedBlogs,
};
