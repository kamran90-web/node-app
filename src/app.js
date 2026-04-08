const express = require("express");
const routes = require("./routes");

const app = express();

app.use(express.json());

// use routes
app.use("/api", routes);

// health check
app.get("/", (req, res) => {
  res.send("App is running 🚀");
});

module.exports = app;
