const express = require('express')
const app = express()
const port  = 6600
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
app.use("/app/v1", registrationRoutes)
app.use("/app/v1", loginRouter)
app.use("/app/v1", addContactRouter)
app.get('/app/v1', (req, resp)=>{
    resp.send("ok")
})


app.listen(port, ()=>{
    console.log("server is up successfully at", port)
})