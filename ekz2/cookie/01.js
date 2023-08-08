const express= require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();


app.use(cookieParser('secret'));
app.use(express.urlencoded({extended:true}))
app.use(bodyParser.json());

app.get('/number', (req, res) => {
    const number = Math.floor(Math.random() * 10);
    res.cookie('number', number ,{maxAge:1400000})
    res.json('number generated')
})


app.get('/clear', (req, res) => {
    res.clearCookie('number');
    res.json('number cleared')
})

app.listen(5000)