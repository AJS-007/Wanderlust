const mongoose = require("mongoose")
const Schema = mongoose.Schema
const passportLocalMongoose=require("passport-local-mongoose")

const userSchema = new Schema({
email:{
    type:String,
    required:true
}
// passport automatically username password salting hashing feilds bna deta h humlog ko bnane ki jrrt ni

})

userSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("User",userSchema)