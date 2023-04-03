const { default: mongoose } = require("mongoose");

const response = mongoose.Schema({
    uuid : {type : String, required : true}, 
    email : {type : String, required : true}, 
    response : {type : Array,default : []}
},{timestamp : true})

module.exports = mongoose.model('response',response)