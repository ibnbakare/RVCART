const jwt = require("jsonwebtoken");


const verifyToken = (req, res, next) => {

    const authHeader = req.headers.token
    if (authHeader) {
        const token = authHeader.split(" ")[1]
        jwt.verify(token, process.env.JWT_SEC, (err, user) => {
            if (err) {
                res.status(403).json("Token not valid")
            }
            req.user = user;
            next()
        })
    }
    else {
        return res.status(401).json("you are not authenticATED")
    }

}

const verifyTokenAndAuth = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin ) {
            next()
        }
        else {
            res.status(403).json({ message: "you are not allowed to access this" })
        }
    });
};

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next()
        }
        else {
            res.status(403).json({ message: "you are not allowed to access this" })
        }
    });
};



// function isequal(value1, value2) {
//     return value1 === value2;
//   }
// const verifyTokenAndAuth = (req,res,next)=> {


//     verifyToken(req,res,()=> {
//         console.log(req.params.id,req.user.id);
//         console.log(req.params)
//          console.log(isequal(req.user.id,req.params.id))
//          if(req.user.id === req.params.id){
          
//             next()
//          }
//         const verifyToken = (req,res,next)=> {
//             const checking= req.headers.token
//             res.status(200).json(checking)
//             next()
//          }
// //     })
   


module.exports = {verifyToken, verifyTokenAndAuth,verifyTokenAndAdmin};
