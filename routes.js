const express = require("express")
const router = express.Router()
const fs = require("fs")
router.use(express.urlencoded({ extended: true }))

// Routes

router.post("/results", (req, res) => {
  fs.readFile("./restaurants.json", "utf-8", (err, data) => {
    const { restaurant, cuisines } = data
    const formInfo = req.body
    console.log(formInfo)
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
          console.log("true")
          resultsArray.push(restaurant[i])
        }
      }
    }
    // console.log(resultsArray)
  })
})

module.exports = router
