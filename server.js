const express = require('express')
const hbs = require('express-handlebars')
const routes = require('./routes')

const server = express()
module.exports = server

// Middleware
server.engine('hbs', hbs({
  extname: 'hbs'
}))
server.set('view engine', 'hbs')
server.use(express.static('public'))

// Routes
server.get('/', (req, res) => {
  const viewData = {
    title: 'Gallery'
  }
  const template = 'home'
  res.render(template, viewData)
})
