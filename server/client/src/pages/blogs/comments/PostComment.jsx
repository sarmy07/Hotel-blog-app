import { Button } from "flowbite-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { usePostCommentMutation } from "../../../redux/features/comments/commentApi";
import { useFetchBlogByIdQuery } from "../../../redux/features/blogs/blogsApi";

const PostComment = () => {
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const { user } = useSelector((state) => state.auth);
  // console.log(user);

  const [postComment, { error, isLoading }] = usePostCommentMutation();
  const { refetch } = useFetchBlogByIdQuery(id, { skip: !id });

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please login to comment on this post!");
      navigate("/login");
      return;
    }
    const newComment = {
      comment: comment,
      user: user?._id,
      blogId: id,
    };
    // console.log(newComment);

    try {
      const res = await postComment(newComment).unwrap();
      console.log(res);
      alert("Comment posted!");
      setComment("");
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-lg font-medium mb-8">Leave a comment</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          name=""
          value={comment}
          cols="30"
          rows="10"
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share a comment on this post..."
          className="w-full bg-bgPrimary focus:outline-none p-5 rounded-md"
        />
        <Button type="submit" className="w-full mt-2">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default PostComment;
