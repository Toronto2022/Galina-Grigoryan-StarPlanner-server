require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT;
const authRoutes = require("./routes/authRouter");
const randomImageRoutes = require("./routes/randomImageRouter"); // Adjust the path as necessary
const authorizer = require("./middlewares/authorize.middleware");

// const authMiddleware = require("./middlewares/authorize.middleware");
//middlewares
app.use("/files", express.static("./files"));
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/api/random-image", randomImageRoutes);
app.get("/api/tasks", authorizer, (req, res) => {
  console.log(req.userObj);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
