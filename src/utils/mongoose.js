module.exports = {

    multipleMongooseToObject: function (array) {
        return array.map(item => item.toObject())

    },

    mongooseToObject: function (object) {
        return object ? object.toObject() : object
    }
}