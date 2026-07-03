const mongoose = require('mongoose')
const Image_scheme = new mongoose.Schema(
    { 
        url:{
            type: string 
        },

    }


)
const ImageScheme = mongoose.model('ImageScheme' ,Image_scheme )
module.exports = ImageScheme