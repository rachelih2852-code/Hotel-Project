const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema(
    {
        customer_id: {
            type: String 
        },
        room_id: {
            type: Number
        },
        check_in_date: {
            type: Date
        },
        check_out_date: {
            type: Date
        },
        num_guests: {
            type: Number
        },
        total_price: {
            type: floa
        },
        status: {
            type: String
        },
        created_at: {
            type: Date
        }
    }
)

const Booking = mongoose.model('Booking',bookingSchema)

module.exports = Booking;