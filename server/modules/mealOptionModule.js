const mongoose = require('mongoose')
const Meal_option= new mongoose.Schema(
    { 
        
       name:{
            type: string
            
        },
        price_per_person:{
             type: Number
        },
        description:{
             type: string
        }
    }


)
const Meal_option = mongoose.model('Meal_option' ,Meal_optionScema )
module.exports = Meal_option