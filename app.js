const express = require("express");
const cors = require("cors");
const routerApi = require("./src/api/routes/index");

const app = express();

app.use(express.json());

routerApi(app);

// Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: false }));

module.exports = app;
