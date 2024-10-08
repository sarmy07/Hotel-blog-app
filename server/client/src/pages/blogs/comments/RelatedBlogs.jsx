import React from "react";
import { useFetchRelatedBlogsQuery } from "../../../redux/features/blogs/blogsApi";
import { Link, useParams } from "react-router-dom";

const RelatedBlogs = () => {
  const { id } = useParams();
  const { data: blogs, error, isLoading } = useFetchRelatedBlogsQuery(id);
  // console.log(blogs);

  return (
    <div>
      <h3 className="text-2xl font-medium px-8 pt-8 pb-5">Related Blogs</h3>
      <hr />

      {blogs?.length > 0 ? (
        <div className="space-y-4 mt-5">
          {blogs?.map((blog) => (
            <Link
              key={blog._id}
              to={`/blogs/${blog._id}`}
              className="flex flex-col sm:flex-row sm:items-center gap-4 shadow-sm px-8 py-4"
            >
              <div className="size-14">
                <img
                  src={blog?.coverImg}
                  className="h-full w-full rounded-full ring-2 ring-blue-700"
                  alt=""
                />
              </div>
              <div className="">
                <h4 className="font-medium text-blue-500 text-sm">
                  {blog?.title.substring(0, 50)}
                </h4>
                <p className="text-xs">
                  {blog?.description.substring(0, 50)}...
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="p-8">No related blogs found</div>
      )}
    </div>
  );
};

export default RelatedBlogs;
