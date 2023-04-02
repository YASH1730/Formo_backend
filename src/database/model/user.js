const { default: mongoose } = require("mongoose");

const user = mongoose.Schema({
    username : {type : String, required : true}, 
    email : {type : String, unique : true} ,
    password : {type : String, required : true} 
},{timestamp : true})

module.exports = mongoose.model('user',user)