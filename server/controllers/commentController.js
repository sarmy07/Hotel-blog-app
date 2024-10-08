const Comment = require("../models/Comment");

const getComments = async (req, res) => {
  const comments = await Comment.countDocuments({});
  return res.status(200).json(comments);
};

const createComment = async (req, res) => {
  try {
    const comment = await Comment.create(req.body);
    return res.status(200).json(comment);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createComment, getComments };
