//initconfig
const fs = require("fs")
const express = require("express")
const hbs = require("express-handlebars")
const routes = require("./routes.js")
const server = express()
//use files
server.use("/results", routes)
server.use(express.static("public"))
server.use(express.urlencoded({ extended: false }))

// Middleware
server.engine(
  "hbs",
  hbs({
    extname: "hbs",
  })
)
server.set("view engine", "hbs")

server.get("/", (req, res) => {
  const viewData = {
    title: "Gallery",
  }
  const template = "home"
  res.render(template, viewData)
})

module.exports = server
