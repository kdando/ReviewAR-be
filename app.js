//Instancing the server
const express = require("express");
const app = express();
app.use(express.json());

//top-level router
const apiRouter = require("./routes/api-router");
app.use("/api", apiRouter);



//////////////////////////////

////ERROR HANDLING////
//400 Bad Path
app.use((req, res, next) => {
    return res.status(400).send({ msg: "Path does not exist."});
})

//PSQL specific errors
app.use((err, req, res, next) => {
    if (err.code === "22P02") {
      res.status(400).send({ msg: "Bad Request" });
    } else if (err.code === "23502") {
      res.status(400).send({ msg: "Missing value on NON NULL property" });
    } else if (err.code === "23503") {
      res.status(400).send({
        msg: "FOREIGN KEY VIOLATION, referenced row does not exist in the referenced table",
      });
    }
    next(err);
})

//Error received from model
app.use((err, req, res, next) => {
    if (err.status && err.msg) {
        return res.status(err.status).send(err);
    }
    return res.status(404).send({ msg: "Not found."});
})

//"Catch all bucket" for other errors
app.use("*", (err, req, res, next) => {
    return res.status(500).send({ msg: "Internal server error."})
})

module.exports = app;