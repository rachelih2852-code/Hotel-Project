const mongoose = require('mongoose')
const Room_Typescema = new mongoose.Schema(
    {
        
        sort:{
            type: string
            
        },
        maxguests:{
             type: Number

        },
        base_price:{
             type: Number

        },
        descriotion:
        {
            type: string

        },



    }


)
const Room_Typescema = mongoose.model('Room_Type' ,Room_TypeScema )
module.exports = Room_Typescema