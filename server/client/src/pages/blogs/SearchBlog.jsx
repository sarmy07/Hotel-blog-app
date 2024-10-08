// import { Button } from "flowbite-react";
import React from "react";

const SearchBlog = ({ search, handleSearchChange, handleSearch }) => {
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <div className="w-full flex">
      <input
        value={search}
        onChange={handleSearchChange}
        onKeyPress={handleKeyPress}
        type="text"
        placeholder="Hotels with rooftop pools near you..."
        className="py-2 px-4 w-full mr-5 bg-[#f7f8f9] focus:outline-none focus:border rounded-md"
      />
      <button
        onClick={handleSearch}
        className="bg-[#1e73be] px-4 py-2 text-white rounded-md"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBlog;
