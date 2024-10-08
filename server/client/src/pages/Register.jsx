import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../redux/features/auth/authApi";
import { setUser } from "../redux/features/auth/authSlice";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const [registerUser, { error, isLoading }] = useRegisterUserMutation();

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser({ email, username, password }).unwrap();
      console.log(res);
      dispatch(setUser({ user: res }));
      alert("Registration successful. Now login!");
      navigate("/login");
    } catch (error) {
      setMessage("Please provide a valid username, email and password");
    }
  };

  return (
    <div className="bg-white max-w-sm mx-auto p-8 mt-20 rounded">
      <h3 className="text-2xl font-semibold pt-5">Please Register</h3>
      <form
        onSubmit={handleRegister}
        className="max-w-sm mx-auto pt-8 space-y-5"
      >
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full bg-bgPrimary px-5 py-3 focus:outline-none rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full bg-bgPrimary px-5 py-3 focus:outline-none rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full bg-bgPrimary px-5 py-3 focus:outline-none rounded"
        />

        {message && <p className="text-red-500">{message}</p>}

        <button className="w-full mt-5 bg-primary text-white py-3 hover:bg-indigo-500 font-medium rounded">
          Register
        </button>
      </form>

      <p className="py-5 text-center">
        Already have an account? please {""}
        <Link className="text-blue-500 italic" to={"/login"}>
          Login
        </Link>{" "}
      </p>
    </div>
  );
};

export default Register;
