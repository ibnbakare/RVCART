const express = require("express")
const router = express.Router()
// const User = require("../models/user")
const Cart = require("../models/cart")
// const {verifyTokenAndAuth} = require("./verifyToken")
const {verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin} = require("./verifyToken")


// create product

router.post("/create",verifyToken,async(req,res)=>{
    const newCart = new Cart(req.body)

    try{
        const savedCart = await newCart.save()
        res.status(201).json(savedCart)
    }
    catch(err){
        res.status(500).json(err.message)
    }
})
//UPADTE PRODUCT
router.put('/:id',verifyTokenAndAuth,async(req, res) => {
   
    try{
    const updatedCart = await Product.findByIdAndUpdate(
        req.params.id, {$set: req.body},{new: true}
    )
    res.status(201).json(updatedCart)
    
    // res.status(200).json({...others, msg:"pass upadted"})
} catch (err) {
    res.status(500).json({message: err.message})}
})

// // DELETE

router.delete("/:id",verifyTokenAndAuth, async (req,res) => {
    try {
   await Cart.findByIdAndDelete(req.params.id)
   res.status(200).json("Cart has been delated...")
}
catch(err){
    res.status(500).json(err)
}
})

// // GET USER CART

router.get("/find/:id",async(req,res)=> {
    try{
    const getCart = await Cart.findOne({userId:req.params.id})
    
    res.status(200).json(getCart)
    }
    catch(err){
        res.status(500).json(err.message)
    }
})

// // GET A limit of users

router.get("/",verifyTokenAndAdmin,async(req,res)=> {
    try{
    const cartAll = await Cart.find()
    res.status(200).json(cartAll)
    }
    catch(err){
       res.status(500).json(err.message) 
    }
})
module.exports = router;