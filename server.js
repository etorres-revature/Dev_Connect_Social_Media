const express = require("express");
const connectDB = require("./config/db");

const app = express();

//connect to DB
connectDB();

//initi middleware
app.use(express.json({ extended: false }));

//define routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));

PORT = process.env.PORT || 46723;

app.listen(PORT, () =>
  console.log(`Server started at http://localhost:${PORT}`)
);
