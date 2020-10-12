const express = require('express')
const app = new express.Router()
const series = require('../DB/Schema/Series')
const adminauth = require('../Middleware/Auth')
app.post('/addseries',adminauth,async (req,res)=>
{
    try{
        const seriess = await series(req.body)
        seriess.save()
        res.status(200).send('series add succ')
    }catch(e){
        res.status(400).send(e.message)
    }
})
app.post('/removeseries/:id',adminauth,async (req,res)=>
{
    try{
        const seriess = await series.findById(req.params.id)
        await seriess.remove() 
        res.status(200).send('film removed succ')
    }catch(e){
        res.status(400).send(e.message)
    }
})
app.patch('/updateonlyseries/:id',adminauth,async (req,res)=>
{
    const seriess = await series.findById(req.params.id)
  
    const keys = Object.keys(req.body)
    const allaw = ['name','year','posterlink','description','type','Cast','videoembbed']
    const check = keys.every((key)=>allaw.includes(key))
    try{
        if(!check)
        {
            throw new Error('key not include update doesnt compelet ')

        }
        keys.forEach((key)=>
        {
            
            
            seriess[key] = req.body[key]

        })
        const updateUser = await seriess.save()
        res.send(updateUser)

    }catch(e)
    {
        res.send(e.message)
    }
})
app.get('/getseries',async (req,res)=>
{
    res.setHeader('Access-Control-Allow-Origin', '*');
    try{
        const seriess = await series.find({})
        res.status(200).send(seriess)
    }catch(e){
        res.status(400).send(e.message)
    }
})
app.get('/getseries/:id',async (req,res)=>
{
    try{
        const seriess = await series.findById(req.params.id)
        res.status(200).send(seriess)
    }catch(e){
        res.status(400).send(e.message)
    }
})
app.get('/getarabicgetseries',async (req,res)=>
{
    res.setHeader('Access-Control-Allow-Origin', '*');
    try{
        const skip = req.query.skip;
        const limit = req.query.limit;
        const seriess =  await series.find({type:'arabic'},{},{skip:parseInt(skip),limit:parseInt(limit)}).sort({'createdAt':-1})    
        res.status(200).send(seriess)
    }catch(e){
        res.status(400).send(e.message)
    }
})
app.get('/getenglishgetseries',async (req,res)=>
{
    res.setHeader('Access-Control-Allow-Origin', '*');
    try{
        const skip = req.query.skip;
        const limit = req.query.limit;
        const seriess =  await series.find({type:'english'},{},{skip:parseInt(skip),limit:parseInt(limit)}).sort({'createdAt':-1})    
        res.status(200).send(seriess)
    }catch(e){
        res.status(400).send(e.message)
    }
})
app.get('/searchseries/:search',async (req,res)=>
{
    try{
        const film = await series.find({name:{"$regex": req.params.search}})   
        res.status(200).send(film)
    }catch(e){
        res.status(400).send(e.message)
    }
})
module.exports=app