const express = require("express")
const router = express.Router()
const fileUploader = require('express-fileupload')
const { body, validationResult } = require("express-validator")
const contactModel = require('../models/cantactsModel')

//handle midleWares

router.use(express.json())
router.use(express.urlencoded())
// router.use(fileUploader({
//     useTempFiles:true
// }))
//get method
router.get("/contacts", async (req, resp) => {
    try {
        const data = await contactModel.find({user:req.user}).sort({name:1})
        resp.status(200).json({
            status: "Success",
            data
        })
    } catch (e) {
        console.log(e.message)
    }
})
//post method
router.post("/contacts", body("name").isLength({ min: 3 }),
    body("phone").isNumeric(), async (req, resp) => {
        try {
            console.log(req.body)
            const { name, email, phone,adress } = req.body
            const data = await contactModel.create({
                name: name,
                email: email ? email : null,
                phone: parseInt(phone),
                adress: adress ? adress:null,
                user: req.user
            })
            resp.status(201).json({
                status: "Success",
                message: "Data Successfully saved"
            })
        } catch (e) {
            resp.status(409).json({
                status: "failure",
                error: e.message
            })
        }
    })

    router.delete("/contacts:id", async (req, res)=>{
        try{
            const {id} = req.params
            console.log(id)
            let val = id.split(":")[1]
            console.log(val)
            const data=  await contactModel.deleteOne({_id:val}) 
            res.status(200).json({
                status:"Success",
                data
            })
        }catch(e){
            console.log(e.message)
        }
    })

module.exports = router