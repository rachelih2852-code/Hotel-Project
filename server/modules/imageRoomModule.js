const mongoose = require('mongoose')
const Image_Room = new mongoose.Schema(
    { 
        id_room:{
            type: string
            
        },
        id_img:{
             type: Number
        }
    }


)
const Image_Room = mongoose.model('Image_Room' ,Image_RoomScema )
module.exports = Image_Room