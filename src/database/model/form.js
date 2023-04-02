const { default: mongoose } = require("mongoose");

const form = mongoose.Schema({
    uuid : {type : String, required : true, unique : true}, 
    email : {type : String, required : true}, 
    title : {type : String}, 
    description : {type : String}, 
    sections : {type : Array, default : []} , 
},{timestamp : true})

module.exports = mongoose.model('form',form)