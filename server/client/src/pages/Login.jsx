import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/features/auth/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const [loginUser, { isLoading, error }] = useLoginUserMutation();

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser({ email, password }).unwrap();
      console.log(res);
      // const { token, user } = res;
      dispatch(setUser({ user: res }));
      alert("Login successful");
      navigate("/");
    } catch (error) {
      setMessage("Please provide a valid email and password");
    }
  };

  return (
    <div className="bg-white max-w-sm mx-auto p-8 mt-24 rounded">
      <h3 className="text-2xl font-semibold pt-5">Please Login</h3>
      <form onSubmit={handleLogin} className="max-w-sm mx-auto pt-8 space-y-5">
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

        <button
          disabled={isLoading}
          className="w-full mt-5 bg-primary text-white py-3 hover:bg-indigo-500 font-medium rounded"
        >
          Login
        </button>
      </form>

      <p className="py-5 text-center">
        Don't have an account?{" "}
        <Link className="text-blue-500 italic" to={"/register"}>
          Register
        </Link>{" "}
        here.
      </p>
    </div>
  );
};

export default Login;
