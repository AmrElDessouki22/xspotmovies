const express = require('express')
const app = new express.Router()


app.get('/', function (req, res) {
    res.render('index.hbs')
  })
  app.get('/dashboard/login', function (req, res) {
      res.render('Loginadmin.hbs')
    })
  app.get('/dashboard/catigory', function (req, res) {
      res.render('catigory.hbs')
    })
  app.get('/dashboard/films', function (req, res) {
      res.render('Films.hbs')
    })
  app.get('/dashboard/series', function (req, res) {
      res.render('series.hbs')
    })
  app.get('/dashboard/football', function (req, res) {
      res.render('Football.hbs')
    })
  app.get('/dashboard/addfootball', function (req, res) {
      res.render('addfootball.hbs')
    })
  app.get('/dashboard/addfilm', function (req, res) {
      res.render('addfilm.hbs')
    })
  app.get('/dashboard/addseries', function (req, res) {
      res.render('addseries.hbs')
    })
  app.get('/dashboard/updateseries/:id', function (req, res) {
      res.render('updateseries.hbs',{id:req.params.id})
    })
  app.get('/dashboard/updatefootball/:id', function (req, res) {
      res.render('updatefootball.hbs',{id:req.params.id})
    })
  app.get('/dashboard/updatefilm/:id', function (req, res) {
      res.render('updatefilm.hbs',{id:req.params.id})
    })
  app.get('/dashboard/episods', function (req, res) {
      res.render('episods.hbs')
    })


module.exports = app  