const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const Adminschema = new Schema({
    firstteam: {type:String},
    secoundteam: {type:String},
    posterlink: {type:String},
    time:{type:String},
    video:{type:String}
  
    
  },{timestamps:true});

const MyModel = mongoose.model('Football', Adminschema);
module.exports = MyModel