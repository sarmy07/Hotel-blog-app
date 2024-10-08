import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import AdminNavigation from "./AdminNavigation";


const AdminLayout = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user || user.role !== "admin") {
    // alert("Oops! Only Admins can access this page..Login as Admin.");
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="container mx-auto flex flex-col md:flex-row gap-4 items-start justify-start">
      <header className="w-full lg:w-1/5 sm:w-2/5">
        <AdminNavigation />
      </header>
      <main className="bg-white p-8 w-full">
        {/* <p>for admin content</p> */}
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
