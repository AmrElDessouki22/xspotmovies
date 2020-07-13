const admin = require('../DB/Schema/Admin')
const jwt = require('jsonwebtoken')
const authadmin = async(req,res,next)=>
{
    try{  
    const token = req.header('Authorization').replace('Bearer ','')
    const tokenDecode =  jwt.verify(token,'yarapyaarhamalrahmeenyarzak')
    const findIt = await admin.findOne({_id:tokenDecode.id})
    if(!findIt)
    {
        throw new Error('cant login')
    }
    for (let index = 0; index < findIt.Token.length; index++) {
        if(findIt.Token[index].token == token){
            req.admin = findIt
            req.token = token
            next()
            break
        }else if(index == findIt.Token.length-1 )
        {
            req.admin = undefined
            req.token = undefined
            next()
           
        }
        
    }
    if(findIt.Token.length == 0)
    {
        throw new Error('cant login ') 
    }
   
    }catch(e)
    {        
        res.status(404).send(e.message)
        next()

    }

}
module.exports = authadmin