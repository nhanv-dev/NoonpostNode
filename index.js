const express = require('express')
const app = express()
const morgan = require('morgan')

const path = require('path')
const handlebars = require('express-handlebars')

const route = require('./src/routes')
const db = require('./src/config/db')
const methodOverride = require('method-override')

const port = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, 'src/public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride('_method'))
// Set log
app.use(morgan('combined'))

// Set engine handlebars
app.engine('hbs', handlebars.engine({
  extname: '.hbs',
  helpers: {
    convertDate: (time) => {
      var day = new Date(time);
      var today = new Date();
      var options = {
        day: "numeric",
        month: "long",
        year: "numeric"
      }
      return time ? day.toLocaleDateString("en-US", options) : today.toLocaleDateString("en-US", options);
    },
    convertHashtag: (array) => {
      array = array.map((item) => {
        if (item !== null && item !== '' && item !== ' ')
          return '#' + item.name + 213213
      })
      return array ? array.join(' ') : null
    },
    findSelected: (str1, str2) => {
      return str1 === str2
    }
  }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'src/views'));

// Connect to MongoDB
db.connect()

// Routing init
route(app)

app.listen(port, () => {
  console.log(`WebApp listening on port ${port}`)
})