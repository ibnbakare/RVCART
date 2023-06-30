const express = require("express")
const router = express.Router()
const User = require("../models/user")
// const {verifyTokenAndAuth} = require("./verifyToken")
const {verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin} = require("./verifyToken")

// UPDATE USER
router.put('/:id',verifyTokenAndAuth,async(req, res) => {
    if(req.body.password) {
        req.body.password= CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()

    }
    try{
    const updatedUser = await User.findByIdAndUpdate(
        req.params.id, {$set: req.body},{new: true}
    )
    // res.status(201).json(updatedUser)
    const {password, ...others} = updatedUser._doc
    res.status(200).json({...others, msg:"pass upadted"})
} catch (err) {
    res.status(500).json({message: "look"})}
})

// DELETE

router.delete("/:id",verifyTokenAndAuth, async (req,res) => {
    try {
   await User.findByIdAndDelete(req.params.id)
   res.status(200).json("User has been delated...")
}
catch(err){
    res.status(500).json(err)
}
})

// GET USER

router.get("/find/:id",verifyTokenAndAuth,async(req,res)=> {
    try{
    const getUser = await User.findById(req.user.id)
    const {password,...other} = getUser._doc
    res.status(200).json(other)
    }
    catch(err){
        res.status(500).json("cant find user")
    }
})
// GET A limit of users
router.get("/",verifyTokenAndAdmin,async(req,res)=> {
    const query = req.query.new
    try{
        if(query){
            const getOne = await User.find().sort({_id:-1}).limit(3)
            res.status(200).json(getOne)
        }
        else{
    const getALL = await User.find()
   
    res.status(200).json(getALL)}
    }
    catch(err){
        res.status(500).json("cant find user")
    }
})

//GET USER STATS

router.get("/stat", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try {
        const data = await User.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            {
                $project: {
                    $month: { $month: "$createdAt" },
                }
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 }
                }
            }
        ])
        res.status(200).json(data)
    }catch(err){
        res.status(500).json("cant get it")
    }
})
















// router.get('/:id',verifyTokenAndAuth,(req, res) => {
  
//  console.log(req.params.id,req.user.id)
//  if (req.params.id ===req.user.id){
//  res.json({name:req.params.id,other:req.user.id})
//  }
//     }
//     );
   

module.exports = router;