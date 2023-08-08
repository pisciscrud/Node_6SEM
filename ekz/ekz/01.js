const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./router')

const app = express();
app.use(bodyParser.json());
app.use('/', userRouter );


app.use(( req, res, next) =>
{
      res.json(`You have some troubles with you data`) 
})

app.listen(3000);


