const express = require('express')
const app = new express.Router()
const admin = require('../DB/Schema/Admin')
const adminauth = require('../Middleware/Auth')



app.get('/checkuser',adminauth,async (req,res)=>
{
try{
        if(req.admin == undefined)
        {
            res.status(404).send()
        }else
        {
            res.status(200).send()

        }
}
catch(e)
{
            res.status(404).send()
}
})
app.post('/addAdmin', async (req,res)=>
{
    try
    {
        const newadmin = await admin(req.body)
        await newadmin.save()
        res.status(200).send('welcome new admin to ur site:'+newadmin)
    }catch(e)
    {

    }

})
app.post('/loginAdmin', async (req,res)=>
{
    

    try
    {   
        const loginadmin = await admin.CheckUser(req.body.email,req.body.password)
        await loginadmin.token()
        res.cookie('token',await loginadmin.Token[0]['token'])
        res.status(200).send('Login admin done succ')
    }catch(e)
    {
        res.status(400).send('cant login :'+e.message)
    }

})
app.post('/logoutadmin',adminauth, async (req,res)=>
{
    try
    {   
        const loginadmin = await admin.findOne({email:req.admin.email})
        loginadmin.Token = []
        await loginadmin.save()
        res.status(200).send('Logout succ')
    }catch(e)
    {
        res.status(404).send()
    }

})
module.exports = app