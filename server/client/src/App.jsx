import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer1 from "./components/Footer1";
import Home from "./pages/Home";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BlogDetails from "./pages/blogs/BlogDetails";
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import AddNewPost from "./pages/admin/addNewPost/AddNewPost";
import ManageItems from "./pages/admin/manageItems/ManageItems";
import Users from "./pages/admin/users/Users";
import UpdateItems from "./pages/admin/manageItems/UpdateItems";

const App = () => {
  return (
    <div className="bg-bgPrimary min-h-screen flex flex-col">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route element={<AdminLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add-new-post" element={<AddNewPost />} />
            <Route path="/manage-items" element={<ManageItems />} />
            <Route path="/users" element={<Users />} />
            <Route path="/update-items/:id" element={<UpdateItems />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
        </Routes>
        <Footer1 />
      </Router>
    </div>
  );
};

export default App;
