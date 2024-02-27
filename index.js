require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT;
const authRoutes = require("./routes/authRouter");
const randomImageRoutes = require("./routes/randomImageRouter");
const tasksRouter = require("./routes/tasksRouter");

app.use("/files", express.static("./files"));
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/api/random-image", randomImageRoutes);
app.use("/api/tasks", tasksRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
