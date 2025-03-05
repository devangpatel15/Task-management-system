const express = require("express");
const { connectDB } = require("./config/db");
const userRouter = require("./Routers/User");
const taskRouter = require("./Routers/Task");

const cors = require("cors");

const app = express();
require("dotenv").config();

connectDB();

app.use(express.json());
app.use(cors());

app.use("/api/users", userRouter);
app.use("/api/tasks", taskRouter);

app.use("/api", userRouter);

app.get("/", (req, res) => {
  res.send("api call successfully");
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
