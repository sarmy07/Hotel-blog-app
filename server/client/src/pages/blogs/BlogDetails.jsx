import React from "react";
import { useParams } from "react-router-dom";
import { useFetchBlogByIdQuery } from "../../redux/features/blogs/blogsApi";
import BlogDetailsCard from "./BlogDetailsCard";
import CommentsCard from "./comments/CommentsCard";
import RelatedBlogs from "./comments/RelatedBlogs";

const BlogDetails = () => {
  const { id } = useParams();
  //   console.log(id);

  const { data: blog, error, isLoading } = useFetchBlogByIdQuery(id);
  // console.log(blog);
  return (
    <div className="container mt-8 text-primary mx-auto">
      <div className="">
        {isLoading && <>Loading...</>}
        {error && (
          <p className="mx-auto items-center">Oh no, there was an error</p>
        )}

        {blog && (
          <div className="flex flex-col lg:flex-row justify-between items-start md:gap-12 gap-8">
            <div className="lg:w-2/3 w-full">
              <BlogDetailsCard blog={blog} />
              <CommentsCard comments={blog.comments} />
            </div>
            <div className="bg-white lg:w-1/3 w-full">
              <RelatedBlogs />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogDetails;
