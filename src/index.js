const express = require('express')
const app = express()
const morgan = require('morgan')

const route = require('./routes')

const path = require('path')
const handlebars = require('express-handlebars')

const port = process.env.PORT || 3000

// Set log
app.use(morgan('combined'))

// Set engine handlebars
app.engine('hbs', handlebars.engine({
  extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Routing init
route(app)

app.listen(port, () => {
  console.log(`Webapp listening on port ${port}`)
})