const express = require('express')
const app = new express.Router()
const football = require('../DB/Schema/Football')
const adminauth = require('../Middleware/Auth')
app.post('/addmatch',adminauth,async (req,res)=>
{
    try{
        const footballs = await football(req.body)
        footballs.save()
        res.status(200).send('match add succ')
    }catch(e){
        res.status(400).send(e.message)
    }
})
app.post('/removematch/:id',adminauth,async (req,res)=>
{
    try{
        const footballs = await football.findById(req.params.id)
        await footballs.remove() 
        res.status(200).send('film removed succ')
    }catch(e){
        res.status(400).send(e.message)
    }
})
app.patch('/updatematch/:id',adminauth,async (req,res)=>
{
    const footballs = await football.findById(req.params.id)
  
    const keys = Object.keys(req.body)
    const allaw = ['firstteam','secoundteam','posterlink','time','video']
    const check = keys.every((key)=>allaw.includes(key))
    try{
        if(!check)
        {
            throw new Error('key not include update doesnt compelet ')

        }
        keys.forEach((key)=>
        {
            footballs[key] = req.body[key]

        })
        const updateUser = await footballs.save()
        res.send(updateUser)

    }catch(e)
    {
        res.send(e.message)
    }
})
app.get('/getmatche',async (req,res)=>
{
    
    
    try{
        const footballs = await football.find({})
        res.status(200).send(footballs)
    }catch(e){
        res.status(400).send(e.message)
    }
})
app.get('/getmatche/:id',async (req,res)=>
{
    
    try{
        const footballs = await football.findById(req.params.id)
        res.status(200).send(footballs)
    }catch(e){
        res.status(400).send(e.message)
    }
})
module.exports=app