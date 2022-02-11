const mongoose = require("mongoose")

const UserSchema = {
    name:String,
    email: String,
    
}


const UserModel = mongoose.model("User", UserSchema)

module.exports = UserModel



