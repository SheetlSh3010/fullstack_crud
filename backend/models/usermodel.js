const mongoose=require('mongoose')
userSchema=mongoose.Schema({
    name:String,
    pass:String,
    email:String
})
userModel=mongoose.model('crud',userSchema)
module.exports={
    userModel
}