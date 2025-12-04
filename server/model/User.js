const mongoose = require('mongoose');

const userModel = mongoose.Schema({
    name:{
       Type: String,
       required:true,
    },

    password:{
        Type:String,
        required:true,
    },

    email:{
        Type:String,
        required:true,
    }
})

const User = mongoose.model('User',userModel);
module.exports = User;