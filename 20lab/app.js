
const express=require('express');

const hbs = require("hbs");
const expressHbs=require('express-handlebars').create({extname:'.hbs'});
const fs=require('fs');
const bodyParser = require("body-parser");
const telephoneRouter = require ("./routers/telephoneRouter.js");

const app=express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.engine('.hbs',expressHbs.engine);
app.set('view engine','.hbs');

app.use('/',telephoneRouter);



app.use( (req, res, next) => {
    res.status(404).send("Not Found")
  });
  
  
  app.listen(3000, () => {
    console.log('Server listening on port 3000');
  });