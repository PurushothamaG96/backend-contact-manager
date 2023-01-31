const express = require("express")
const router=express.Router()
const fileUploader = require('express-fileupload')
const { body, validationResult, Result } = require('express-validator')
const bcrypt = require("bcrypt")
const loginModel = require("../models/login")

//handle midleWares
router.use(express.json())
router.use(express.urlencoded())
router.use(fileUploader({
    useTempFiles: true
}))
//get method
router.post("/registration",
    body("name").isAlphanumeric(),
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
    body("confirmPassword").isLength({ min: 6 }),
    (req, resp) => {
        try {
            console.log(req.body)
            if(req.body.password!==req.body.confirmPassword){
                resp.status(200).json({
                    status:"Failed",
                    message:"password not matched"
                })
            }
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return resp.status(400).json({ errors: errors.array() });
            }
            else{
                const {name, email, password} = req.body
                bcrypt.hash(password, 10, async (err, encode)=>{
                    if(err){
                        console.log(err.message)
                    }
                    else{
                        const data = await loginModel.create({
                            name,
                            email, 
                            password:encode
                        })
                        resp.status(201).json({
                            status:"Success",
                            data
                        })
                    }
                   
                })
                
            }
            
        } catch (e) {
            console.log(e.message)
        }
    })
//post method
router.get("/contacts", (req, resp) => {
    try {
        resp.send("router working")
    } catch (e) {
        console.log(e.message)
    }
})

module.exports = router