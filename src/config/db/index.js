const mongoose = require('mongoose')

async function connect(options) {
    try {
        const CONNECTION_STRING = process.env.DB
        await mongoose.connect(CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('Database Connected')
    } catch (error) {
        console.log('Database not Connected', error)

    }
}
module.exports = { connect }