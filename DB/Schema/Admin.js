const mongoose = require('mongoose')
const Schema = mongoose.Schema;
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Adminschema = new Schema({
  name: {type:String},
  email: {type:String,unique:true},
  password: {type:String},
  access:{type:Boolean},
  Token:[{token:{type:String}}]
});
Adminschema.methods.token = async function()
{
    try{
    const user = this
    const Token =  jwt.sign({ id:user._id}, process.env.TOKENKEY)
    user.Token = await user.Token.concat({token:Token})
    await user.save()
    }catch(e)
    {
        throw new Error(e.message)
    }
}
Adminschema.methods.toJSON = function()
{
    
    const user_ = this
    const user = user_.toObject()
    delete user.password
    delete user.Token
    return user

}
Adminschema.statics.CheckUser = async (email,password)=>
{
    
    
    const user_ = await MyModel.findOne({email:email})
    if(!user_)
    {
        throw new Error("can't login")
        
        
    }
    const bcyCheck = await bcrypt.compare(password, user_.password)
    if(!bcyCheck)
    {
        console.log('password : '+password);
        throw new Error("can't login")
    }
    return user_
}
Adminschema.pre('save',async function(next){
    try{
        const user = this
        const password = user.password
        if(user.isModified('password'))
        {
            user.password = await bcrypt.hash(password, 8)
        }
        next()
    }catch(e)
    {
        throw new Error('something wrong in pre method :'+e.message)
    }
})
const MyModel = mongoose.model('Admin', Adminschema);
module.exports = MyModel