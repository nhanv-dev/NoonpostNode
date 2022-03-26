const mongoose = require('mongoose')

async function connect(options) {
    try {
        const CONNECTION_STRING = 'mongodb+srv://example:i2raSoDtK1kSDqmr@cluster0.hefx7.mongodb.net/node_blog_prod?retryWrites=true&w=majority'
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