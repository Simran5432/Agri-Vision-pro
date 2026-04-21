const express = require("express");
const app = express();

const analyzeRoutes = require("./routes/analyzeRoutes");

app.use(express.json());
app.use("/", analyzeRoutes);

module.exports = app;