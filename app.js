//Instancing the server
const express = require("express");
const app = express();
app.use(express.json());

//top-level router
const apiRouter = require("./routes/api-router");
app.use("/api", apiRouter);



//////////////////////////////

module.exports = app;