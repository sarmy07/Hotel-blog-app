const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const path = require("path");
const blogRouter = require("./routes/blogRoute");
const commentRouter = require("./routes/commentRoute");
const authRouter = require("./routes/authRoute");
const app = express();

const _dirname = path.resolve();
const mongo_url = `${process.env.mongo_uri}`;

const corsOptions = {
  // origin: "http://localhost:5173",
  origin: "https://hotel-blog-app.onrender.com",
  Credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Authorization", "X-Requested-With"],
};

app.use(cors(corsOptions));

// const allowedOrigins = ["http://localhost:5173", "http://localhost:5000"];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin) return callback(null, true);

//       if (allowedOrigins.indexOf(origin) !== -1) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by Cors"));
//       }
//     },
//     credentials: true,
//   })
// );

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     methods: "GET, POST, PUT, DELETE",
//     credentials: true,
//   })
// );

// app.use(cors());
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:5173");
//   res.header(
//     "Access-Control-Allow-Methods",
//     "GET, HEAD, OPTIONS, POST, PUT, DELETE"
//   );
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   next();
// });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/blogs", blogRouter);
app.use("/api/comments", commentRouter);
app.use("/api/auth", authRouter);

app.use(express.static(path.join(_dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(_dirname, "client", "dist", "index.html"));
});

app.get("/health", (req, res) => {
  res.send("OK");
});

const port = process.env.PORT || 5000;
// console.log("PORT:", port);

const connect = async () => {
  try {
    await mongoose.connect(mongo_url);
    console.log("DB connected");
    app.listen(port, "0.0.0.0", () => {
      console.log(`Server is listening on port: ${port}`);
    });
  } catch (error) {
    console.log("cannot connect to DB because...");
    console.log(error);
  }
};

connect();
