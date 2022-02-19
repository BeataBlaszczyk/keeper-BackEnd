const mongoose = require("mongoose")

const UserSchema = {
    username:String,
    password: String,
    color: String
    
}


const UserModel = mongoose.model("User", UserSchema)

module.exports = UserModel



