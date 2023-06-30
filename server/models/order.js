const mongoose = require("mongoose")

orderSchema = new mongoose.Schema(
    {
    userId:{type:String,required:true},
    products:[
        {
            productId:{type:String,required:true},
            quantity:{type:Number,default:1}
        }
    ],
    amount:{type:Number, required:true},
    address:{type:Object,required:true},
    status:{type:String, defualt:"pending"}

    },
    {timestamps:true}
    
)

module.exports = mongoose.model("order", orderSchema)