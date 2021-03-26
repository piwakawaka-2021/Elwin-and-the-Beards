//initconfig
const fs = require("fs")
const express = require("express")
const hbs = require("express-handlebars")
const routes = require("./routes.js")
const server = express()
//use files
// server.use("/results", routes)
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
server.use(express.static("public"))

server.get("/", (req, res) => {
  const viewData = {
    title: "Gallery",
  }
  const template = "home"
  res.render(template, viewData)
})

server.post("/results", (req, res) => {
  fs.readFile("restaurants.json", "utf-8", (err, data) => {
    const { restaurant, cuisines } = JSON.parse(data)
    const formInfo = JSON.parse(JSON.stringify(req.body))
    let results = { filters: [], minutesAway: 0 }
    cuisines.forEach((e) => {
      if (formInfo.hasOwnProperty(e)) {
        results.filters.push(e)
      }
    })

    results.gluten = formInfo.hasOwnProperty("gluten")
    results.vegan = formInfo.hasOwnProperty("vegan")
    results.minutesAway = Number(formInfo.minutes)

    let resultsArray = []
    for (let i = 0; i < restaurant.length; i++) {
      for (let j = 0; j < results.filters.length; j++) {
        if (
          restaurant[i].cuisine.toUpperCase() ==
            results.filters[j].toUpperCase() &&
          restaurant[i].distance <= results.minutesAway &&
          restaurant[i].vegan == results.vegan &&
          restaurant[i].gluten == results.gluten
        ) {
          resultsArray.push(restaurant[i])
        }
      }
    }
    console.log(resultsArray)
  })
})
module.exports = server
