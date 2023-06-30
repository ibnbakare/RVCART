const express = require("express")
const router = express.Router()
// const User = require("../models/user")
const Product = require("../models/product")
// const {verifyTokenAndAuth} = require("./verifyToken")
const {verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin} = require("./verifyToken")


// create product

router.post("/create",verifyTokenAndAdmin,async(req,res)=>{
    const newProduct = new Product(req.body)

    try{
        const savedproduct = await newProduct.save()
        res.status(201).json(savedproduct)
    }
    catch(err){
        res.status(500).json(err.message)
    }
})
//UPADTE PRODUCT
router.put('/:id',verifyTokenAndAdmin,async(req, res) => {
   
    try{
    const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id, {$set: req.body},{new: true}
    )
    res.status(201).json(updatedProduct)
    
    // res.status(200).json({...others, msg:"pass upadted"})
} catch (err) {
    res.status(500).json({message: err.message})}
})

// // DELETE

router.delete("/:id",verifyTokenAndAdmin, async (req,res) => {
    try {
   await Product.findByIdAndDelete(req.params.id)
   res.status(200).json("User has been delated...")
}
catch(err){
    res.status(500).json(err)
}
})

// // GET USER

router.get("/find/:id",async(req,res)=> {
    try{
    const getProduct = await Product.findById(req.params.id)
    
    res.status(200).json(getProduct)
    }
    catch(err){
        res.status(500).json(err.message)
    }
})

// // GET A limit of users
router.get("/",async(req,res)=> {
    const qNew = req.query.new
    const qCategories = req.query.categories
    try{
        let products;
        if(qNew){
            products = await Product.find().sort({_id:-1}).limit(1)
        }
        else if(qCategories){
            products = await Product.find({categories:
                {$in:[qCategories]}});
        } else {
            products = await Product.find()
        }

       
   
    res.status(200).json(products)}
    
    catch(err){
        res.status(500).json(err.message)
    }
})

module.exports = router;