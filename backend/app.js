const express = require("express");
const path = require("path");
const cors = require("cors");

const session = require("express-session");

const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const diaryRoutes = require("./routes/diary");
const userRoutes = require("./routes/users");

const app = express();
const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.lb5zfqi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected with MongoDB!");
  })
  .catch((err) => {
    console.error("Connection failed!", err);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));
app.use(
  session({
    secret: `${process.env.PASSWORD}`,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);
// app.use(express.static(path.join(__dirname, "frontend")));

app.use("/api/diary-posts", diaryRoutes);
app.use("/api/diary-posts/query", diaryRoutes);

app.use("/api/auth", userRoutes);
app.use("/api/user", userRoutes);
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "frontend", "index.html"));
// });
module.exports = app;
