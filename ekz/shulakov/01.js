const express=require('express')
const  bodyParser = require("body-parser");
const cookieParser=require('cookie-parser')

const app=express()
app.use(express.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use(cookieParser('secret'));


app.post('/post', (req, res) => {
    const {name} = req.body;
    res.cookie('name', name,{path:'/check'},{maxAge:1400000})

   return res.json(`Hello ${name}`);
})

app.get('/check',(req, res) =>{
    const {name} = req.cookies;

    return  res.json(`Hello ${name}`)
})

app.listen(5000)
