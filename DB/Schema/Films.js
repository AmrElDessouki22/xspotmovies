const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const Adminschema = new Schema({
    name: {type:String},
    year: {type:String},
    posterlink: {type:String},
    description:{type:String},
    type:{type:String},
    Cast:[{actors:{type:String}}],
    videoembbed:{type:String}
    
  },{timestamps:true});

const MyModel = mongoose.model('Films', Adminschema);
module.exports = MyModel