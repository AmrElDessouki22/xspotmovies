const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const Adminschema = new Schema({
    name: {type:String},
    year: {type:String},
    posterlink: {type:String},
    description:{type:String},
    type:{type:String},
    Cast:[{actors:{type:String}}],
    videoembbed:[{epsiod:{type:String}}]
    
  },{timestamps:true});

const MyModel = mongoose.model('Series', Adminschema);
module.exports = MyModel