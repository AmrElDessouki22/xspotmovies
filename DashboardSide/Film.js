const express = require('express')
const app = new express.Router()
const films = require('../DB/Schema/Films')
const adminauth = require('../Middleware/Auth')
const fetch = require('node-fetch');
const request = require('request');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
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

app.get('/getarabicfilms',async (req,res)=>
{
    try{
        const skip = req.query.skip;
        const limit = req.query.limit;
        const film =  await films.find({type:'arabic'},{},{skip:parseInt(skip),limit:parseInt(limit)}).sort({'createdAt':-1})    
        res.status(200).send(film)
    }catch(e){
        res.status(400).send(e.message)
    }
})
app.get('/getenglishfilms',async (req,res)=>
{
    try{
        const skip = req.query.skip;
        const limit = req.query.limit;
        const film =  await films.find({type:'english'},{},{skip:parseInt(skip),limit:parseInt(limit)}).sort({'createdAt':-1})    
        res.status(200).send(film)
    }catch(e){
        res.status(400).send(e.message)
    }
})

app.get('/genratelink',async (req,res)=>
{
    try{
        console.log(encodeURI(req.query.link));    

        const request = require('request');
        var url =encodeURI(req.query.link)
  

    request(url, function (error, response, body) {
    const dom = new JSDOM(body);
    res.status(200).send(dom.window.document.getElementsByClassName("WatchURL Gotoscroll nobind Hoverable")[0].href);
});
      
    }catch(e){
        res.status(400).send(e.message)
    }
})



app.get('/searchfilm/:search',async (req,res)=>
{
    try{
        const film = await films.find({name:{"$regex": req.params.search}})   
        res.status(200).send(film)
    }catch(e){
        res.status(400).send(e.message)
    }
})

app.get('/getpriimage/:creatat',async (req,res)=>
{
    try{
        const film = await films.findOne().sort({created_at: req.params.creatat}) 
        res.status(200).send(film.posterlink)
    }catch(e){
        res.status(400).send(e.message)
    }
})
module.exports=app