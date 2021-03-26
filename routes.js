const express = require("express")
const router = express.Router()
const fs = require("fs")
router.use(express.urlencoded({ extended: true }))

// Routes

router.post("/", (req, res) => {
  fs.readFile("./restaurants.json", "utf-8", (err, data) => {
    const { restaurant, cuisines } = JSON.parse(data)
    const formInfo = req.body
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

module.exports = router
