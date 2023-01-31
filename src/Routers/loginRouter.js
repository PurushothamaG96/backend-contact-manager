const express  =require("express")
const router = express.Router()
const {body, validationResult} = require("express-validator")
const bcrypt = require("bcrypt")
const logInModel = require("../models/login")
const secret = "PURU"
const jwt = require("jsonwebtoken")


//handle middleware
router.use(express.json())
router.use(express.urlencoded())

router.post("/login",
    body("email").isEmail(),
    body("password").isLength({min:6}),
    async(req, res)=>{
        const err = validationResult(req)
        if(!err.isEmpty()){
            res.status(200).json({
                status:"Failure",
                Message:err.array()
            })
        }
        else{
            const {email, password} = req.body
            const data = await logInModel.findOne({email:email})
            console.log(data)
            if(!data){
                res.status(404).json({
                    status:"failure",
                    message:"user invalid or need to register"
                })
            }
            else{
                bcrypt.compare(password, data.password, (err, result)=>{
                    if(err){
                        console.log(err.message)
                    }
                    else{
                        const token = jwt.sign({
                            exp: Math.floor(Date.now() / 1000) + (60 * 60),
                            data: data._id
                          }, secret);
                          res.json({
                            message:token
                          })
                    }
                })
            }
            
        }

})

module.exports = router