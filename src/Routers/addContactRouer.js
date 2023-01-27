const router = require("express").Router()
const fileUploader = require('express-fileupload')

//handle midleWares
router.use(fileUploader({
    useTempFiles:true
}))
//get method
router.get("/contacts", (req, resp)=>{
    try{
        resp.send("router working")
    }catch(e){
        console.log(e.message)
    }
} )
//post method
router.get("/contacts", (req, resp)=>{
    try{
        resp.send("router working")
    }catch(e){
        console.log(e.message)
    }
} )

module.exports = router