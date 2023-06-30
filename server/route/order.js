const express = require("express")
const router = express.Router()
// const User = require("../models/user")
const Order = require("../models/order")
// const {verifyTokenAndAuth} = require("./verifyToken")
const {verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin} = require("./verifyToken")


// // create product

router.post("/create",verifyToken,async(req,res)=>{
    const newOrder = new Order(req.body)

    try{
        const savedOrder = await newOrder.save()
        res.status(201).json(savedOrder)
    }
    catch(err){
        res.status(500).json(err.message)
    }
})
// //UPADTE PRODUCT
router.put('/:id',verifyTokenAndAdmin,async(req, res) => {
   
    try{
    const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id, {$set: req.body},{new: true}
    )
    res.status(201).json(updatedCart)
    
    // res.status(200).json({...others, msg:"pass upadted"})
} catch (err) {
    res.status(500).json({message: err.message})}
})

// // // DELETE

router.delete("/:id",verifyTokenAndAdmin, async (req,res) => {
    try {
   await Order.findByIdAndDelete(req.params.id)
   res.status(200).json("Order has been delated...")
}
catch(err){
    res.status(500).json(err.message)
}
})

// // // GET USER Order

router.get("/find/:id",verifyTokenAndAuth,async(req,res)=> {
    try{
    const getOrder = await Order.find({userId:req.params.id}).sort({_id:-1})
    
    res.status(200).json(getOrder)
    
    }
    catch(err){
        res.status(500).json(err.message)
    }
})

router.get("/",verifyTokenAndAdmin,async(req,res) =>{
    try{
        const orders = await Order.find().sort({_id:-1})
        if (orders.length === 0){
        res.status(200).json("Order is empty")

        }
        else
        res.status(200).json(orders)
    } catch(err) {
        res.status(500).json(err.message)
    }
})


// Get monthly income

router.get("/income",verifyTokenAndAdmin,async(req,res) => {
    const date = new Date;
    const lastMonth = new Date(date.setMonth() -1)
    const perviousMonth = new Date(new Date.setMonth(lastMonth.getMonth() -1 ))
try{
    const income = await Order.aggregate([
        {$match:{ createdAt: {$gte:perviousMonth}}},
        {
            $project: {
                 month : {$month:"$createdAt"},
                 sales : $amount
                },
            $group : {
                _id:"$month",
                total:{$sum:"$sales"}
            }
        }
    ])
    res.status(200).json(income)
}
catch(err){
res.status(500).json(err.message)
}
})
// // // GET A limit of users
// router.get("/",async(req,res)=> {
//     const qNew = req.query.new
//     const qCategories = req.query.categories
//     try{
//         let products;
//         if(qNew){
//             products = await Product.find().sort({_id:-1}).limit(1)
//         }
//         else if(qCategories){
//             products = await Product.find({categories:
//                 {$in:[qCategories]}});
//         } else {
//             products = await Product.find()
//         }

       
   
//     res.status(200).json(products)}
    
//     catch(err){
//         res.status(500).json(err.message)
//     }
// })

module.exports = router;