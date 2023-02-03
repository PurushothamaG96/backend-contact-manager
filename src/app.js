const express = require('express')
const app = express()
const port  = 6600
const cors = require("cors")
const secret = "PURU"
const jwt = require("jsonwebtoken")
//import modules
const addContactRouter = require('./Routers/addContactRouer')
const registrationRoutes = require('./Routers/RegisterRouter')
const loginRouter = require('./Routers/loginRouter')
//dot env config
const dotEnv = require("dotenv")
dotEnv.config()
//atlas db connection
const mongoose = require('mongoose')
mongoose.set('strictQuery', true)
mongoose.connect(process.env.DATABASE_URL,{ useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('Successful Connected to DB')
})

//midlewares manage
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use("/app/v1/contacts", (req, res, next)=>{
    jwt.verify(req.headers.authorization, secret, (err, result)=>{
        if(err){
            res.status(401).json({
                message:"unAuthorized"
            })
        }
        else{
            req.user = result.data
            next()
        }
    })
})
app.use("/app/v1/contacts:id", (req, res, next)=>{
    jwt.verify(req.headers.authorization, secret, (err, result)=>{
        if(err){
            res.status(401).json({
                message:"unAuthorized"
            })
        }
        else{
            req.user = result.data
            next()
        }
    })
})
app.use("/app/v1", registrationRoutes)
app.use("/app/v1", loginRouter)
app.use("/app/v1", addContactRouter)
app.get("/app/v1", (req, resp)=>{
    resp.send("ok")
})


app.listen(port, ()=>{
    console.log("server is up successfully at", port)
})