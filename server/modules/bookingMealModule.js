const mongoose = require('mongoose')
const Booking_meal= new mongoose.Schema(
    { 
        
       booking_id:{
            type: string
            
        },
       meal_option_id:{
             type: string
        },
        quantity:{
             type: number
        }
    }


)
const Booking_meal = mongoose.model('Booking_meal' ,Booking_mealScema )
module.exports = Booking_meal