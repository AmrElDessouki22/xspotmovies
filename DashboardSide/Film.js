const express = require('express')
const app = new express.Router()
const films = require('../DB/Schema/Films')
const adminauth = require('../Middleware/Auth')
app.post('/addfilm',adminauth,async (req,res)=>
{
    try{
        const film = await films(req.body)
        film.save()
        res.status(200).send('film add succ')
    }catch(e){
        res.status(400).send(e.message)
    }
})
app.post('/removefilm/:id',adminauth,async (req,res)=>
{
    try{
        const film = await films.findById(req.params.id)
        await film.remove() 
        res.status(200).send('film removed succ')
    }catch(e){
        res.status(400).send(e.message)
    }
})
app.patch('/updateonlyfilm/:id',adminauth,async (req,res)=>
{
    const film = await films.findById(req.params.id)
    console.log(film);
    
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
            
            
            film[key] = req.body[key]

        })
        const updateUser = await film.save()
        res.send(updateUser)

    }catch(e)
    {
        res.send(e.message)
    }
})
app.get('/getfilms',async (req,res)=>
{
    try{
        const film = await films.find({})        
        res.status(200).send(film)
    }catch(e){
        res.status(400).send(e.message)
    }
})
app.get('/getfilm/:id',async (req,res)=>
{
    try{
        const film = await films.findById(req.params.id)        
        res.status(200).send(film)
    }catch(e){
        res.status(400).send(e.message)
    }
})


module.exports=app