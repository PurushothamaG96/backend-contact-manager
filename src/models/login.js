const {model, Schema} = require('mongoose')
const logInSchema = new Schema({
    name:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true}
}, {timestamps:true})

const logModel = model("contactsLogIn", logInSchema)
module.exports = logModel