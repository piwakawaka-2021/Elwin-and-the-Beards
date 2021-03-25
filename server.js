const express = require("express");
const hbs = require("express-handlebars");
const routes = require("./routes");
const fs = require("fs");

const server = express();
module.exports = server;

// Middleware
server.engine(
  "hbs",
  hbs({
    extname: "hbs",
  })
);
server.set("view engine", "hbs");
server.use(express.static("public"));

// Routes
server.get("/", (req, res) => {
  const viewData = {};
  const template = "home";
  res.render(template, viewData);
});

server.get("/results", (req, res) => {
  fs.readFile("./restaurants.json", "utf-8", (err, data) => {
    const parsedData = JSON.parse(data);
    res.render("results", parsedData);
  });
});
