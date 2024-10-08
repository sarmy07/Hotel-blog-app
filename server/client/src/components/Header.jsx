import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Navbar } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import hotel from "../assets/hero-carousel/logo.png";
import avatarImg from "../assets/hero-carousel/commentor.png";
import { useLogoutUserMutation } from "../redux/features/auth/authApi";
import { logout } from "../redux/features/auth/authSlice";

const Header = () => {
  const path = useLocation().pathname;
  const { user } = useSelector((state) => state.auth);
  // console.log(user);

  const [logoutUser] = useLogoutUserMutation();

  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Navbar rounded border container>
      <Navbar.Brand
        as={Link}
        to={"/"}
        className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white"
      >
        <img src={hotel} className="h-14" alt="" />
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link
          as={Link}
          to={"/"}
          active={path === "/"}
          className="hover:underline"
        >
          Home
        </Navbar.Link>
        <Navbar.Link
          as={Link}
          to={"/about-us"}
          active={path === "/about-us"}
          className="hover:underline"
        >
          About
        </Navbar.Link>
        <Navbar.Link
          as={Link}
          to={"/privacy"}
          active={path === "/privacy"}
          className="hover:underline"
        >
          Privacy Policy
        </Navbar.Link>
        <Navbar.Link
          as={Link}
          to={"/contact-us"}
          active={path === "/contact-us"}
          className="hover:underline"
        >
          Contact Us
        </Navbar.Link>

        {user && user.role === "user" && (
          <Navbar.Link className="flex gap-3 items-center">
            <img src={avatarImg} alt="avatar" className="size-8" />
            <button
              onClick={handleLogout}
              className="text-sm bg-blue-500 px-2 py-1 text-white rounded"
            >
              Logout
            </button>
          </Navbar.Link>
        )}

        {user && user.role === "admin" && (
          <Navbar.Link className="flex gap-3 items-center">
            <img src={avatarImg} alt="avatar" className="size-8" />
            <span className="bg-blue-500 px-2 py-1 text-white rounded">
              <Link to={"/dashboard"}>Dashboard</Link>
            </span>
          </Navbar.Link>
        )}

        {!user && (
          <Navbar.Link
            as={Link}
            to={"/login"}
            active={path === "/login"}
            className="hover:underline"
            onClick={handleLogout}
          >
            Login
          </Navbar.Link>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
