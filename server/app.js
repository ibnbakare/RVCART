const express = require('express');
const app   = express();
const dotenv = require("dotenv")
const user = require("./route/user")
const product = require("./route/product")
const cart = require("./route/cart")
const order = require("./route/order")
const authRoute = require("./route/auth")
dotenv.config()
const mongoose = require("mongoose")
const cors = require("cors")



mongoose.connect(
    process.env.MONGO_URL)
     .then(()=>{
         console.log("DB successful")
     }
     ).catch(err=> console.log(err));
   
app.use(cors())

app.use(express.json())
app.use("/api/users",user)
app.use("/api/products",product)
app.use("/api/carts",cart)
app.use("/api/orders",order)
app.use("/api/v1",authRoute)
app.get("/",(req,res)=>{
    res.send("hii")
}
)

app.listen(5000,()=>{
    console.log('listening on port 50000');
});
// console.log("listening on port..")
// console.log("listening on port..")
// console.log("listening on port...")

 console.log("listening on port...")
