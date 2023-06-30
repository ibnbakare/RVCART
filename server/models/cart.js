const mongoose = require("mongoose")

cartSchema = new mongoose.Schema(
    {
    userId:{type:String,required:true},
    products:[
        {
            productId:{type:String,required:true},
            quantity:{type:Number,default:1}
        }
    ]




    },{timestamps:true}
    
)

module.exports = mongoose.model("cart", cartSchema)