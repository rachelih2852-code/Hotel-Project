const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema(
    {
        room_type: {
            type: String 
        },
        room_number: {
            type: Number
        },
        floor: {
            type: Number
        },
        room_number: {
            type: Number
        },
        is_active: {
            type: Boolean
        }
    }
)

const Room = mongoose.model('Room',roomSchema)

module.exports = Room;