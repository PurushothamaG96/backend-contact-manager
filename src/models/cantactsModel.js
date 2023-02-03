const {model, Schema} = require('mongoose')
const objectId = require('mongoose').ObjectId


const contactSchema = new Schema({
    name:{type:String,  required:true},
    phone:{type:Number, required:true},
    imageUrl:{type:String, default:"https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553__340.png"},
    email:{type:String},
    adress:{type:String},
    user:{type:objectId, ref:"contactsLogIns"}
    
})

const contactModel = model("posts", contactSchema);
module.exports = contactModel;