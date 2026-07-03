const mongoose = require('mongoose')

const roomTypescema = new mongoose.Schema(
    {
        
        sort:{
            type: String
            
        },
        max_guests:{
             type: Number

        },
        base_price:{
             type: Number

        },
        description:
        {
            type: String

        },



    }


)
const RoomTypescema = mongoose.model('RoomType' ,roomTypescema )
module.exports = RoomTypescema