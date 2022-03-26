const express = require('express')
const app = express()
const morgan = require('morgan')

const path = require('path')
const handlebars = require('express-handlebars')

const route = require('./routes')
const db = require('./config/db')

const port = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// Set log
app.use(morgan('combined'))

// Set engine handlebars
app.engine('hbs', handlebars.engine({
  extname: '.hbs',
  helpers: {
    convertDate: (time) => {
      var date = new Date(time);
      var options = {
        day: "numeric",
        month: "long",
        year: "numeric"
      }
      return date.toLocaleDateString("en-US", options);
    }
  }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Connect to MongoDB
db.connect()

// Routing init
route(app)

app.listen(port, () => {
  console.log(`WebApp listening on port${port}`)
})