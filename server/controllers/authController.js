const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      return res.status(400).json("All fields are required");
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json("User already exits");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    // console.log("Hashed-Password:", hashPassword);

    const user = await User.create({ username, email, password: hashPassword });
    const { password: pass, ...rest } = user._doc;
    return res.status(200).json(rest);
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json("All fields are required");
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json("user not found");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json("Invalid login credentials");
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.secret,
      {
        expiresIn: "1d",
      }
    );
    const { password: pass, ...rest } = user._doc;
    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === "production", remove this so the client can receive token
        // sameSite: "None", remove this so the client can receive token
      })
      .json(rest);
  } catch (error) {
    console.log(error);
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json("logout successful");
  } catch (error) {
    console.log(error);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "id email username role");
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    // const { id } = req.params;

    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json("No User Found");
    }
    return res.status(200).json("User deleted!");
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    // const { role } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { ...req.body },
      { new: true }
    );
    if (!user) {
      return res.status(400).json("User not found");
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  register,
  login,
  logout,
  getAllUsers,
  deleteUser,
  updateUser,
};
