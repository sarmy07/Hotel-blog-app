import React from "react";
import EditorJSHTML from "editorjs-html";

const editorJSHTML = EditorJSHTML();

const BlogDetailsCard = ({ blog }) => {
  const {
    title,
    description,
    content,
    coverImg,
    author,
    category,
    rating,
    createdAt,
  } = blog || {};

  // console.log("Editor.js blog", blog?.blog?.content);

  const htmlContent = editorJSHTML.parse(blog?.blog?.content).join(" ");

  return (
    <>
      <div className="bg-white p-8">
        <div className="">
          <h1 className="text-3xl md:text-4xl font-medium mb-4">
            {blog?.blog?.title}
          </h1>
          <p className="mb-6">
            <span className="italic text-xs">
              {" "}
              {new Date(blog?.blog?.createdAt).toLocaleDateString()} by{" "}
            </span>
            <span className="text-blue-400 cursor-pointer">Admin</span>
          </p>
        </div>

        <div className="">
          <img
            src={blog?.blog?.coverImg}
            alt=""
            className="w-full md:h-[520px] bg-cover"
          />
        </div>

        <div className="mt-8 space-y-4">
          <div
            dangerouslySetInnerHTML={{ __html: htmlContent }}
            className="space-y-3 editorjsdiv"
          />

          <div className="flex items-center gap-1">
            <span className="text-lg font-medium">Rating:</span>
            <span>{blog?.blog?.rating} (based on over 2000 reviews)</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetailsCard;
