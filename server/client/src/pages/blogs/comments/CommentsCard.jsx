import React from "react";
import { CgProfile } from "react-icons/cg";
import PostComment from "./PostComment";
import { useSelector } from "react-redux";
import commentor from "../../../assets/hero-carousel/commentor.png";

const CommentsCard = ({ comments }) => {
  const user = useSelector((state) => state.auth.user);
  // console.log(comments);
  return (
    <div className="my-6 bg-white p-8">
      <div className="">
        {comments?.length > 0 ? (
          <div>
            <h3>All comments</h3>
            <div className="">
              {comments.map((comment) => (
                <div className="mt-4" key={comment._id}>
                  <div className="flex gap-4 items-center">
                    <img src={commentor} alt="" className="h-14" />
                    <div className=" flex flex-col gap-2">
                      <p className="text-lg font-medium underline underline-offset-4 text-blue-400">
                        {comment?.user?.email}
                      </p>
                      <p className="text-xs italic">
                        {" "}
                        {new Date(comment?.createdAt).toLocaleDateString()}{" "}
                      </p>
                    </div>
                  </div>
                  {/* comment details */}
                  <div className="text-gray-600 mt-5 border p-8">
                    <p className="md:w-4/5">{comment?.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-lg font-medium">No comments</div>
        )}
      </div>

      {/* add comments */}

      <PostComment />
    </div>
  );
};

export default CommentsCard;
