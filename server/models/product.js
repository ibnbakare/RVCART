const mongoose = require("mongoose")

productSchema = new mongoose.Schema(
    {
      title:{type:String, required:true, unique:true },
      desc:{type:String, required:true, unique:true},
      img:{type:String,required:true},
      categories:{type:Array},
      size:{type:Array},
      color:{type:Array},
      price:{type:Number,required:true},
      inStock:{type:Boolean},




    },
    {timestamps:true}
    
)

module.exports = mongoose.model("product", productSchema)