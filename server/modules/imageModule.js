const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema(
    {
        url: {
            type: String
        }
    }
)

const ImageSchema = mongoose.model('ImageSchema', imageSchema)

module.exports = ImageSchema