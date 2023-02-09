const express = require('express');
const Sequelize = require('sequelize');
const path = require('path');
const bodyParser = require('body-parser');


const booksController = require("./controllers/bookController.js");
const bookRouter = require ("./routers/bookRouter.js");

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use('/books',bookRouter);


app.use( (req, res, next) => {
  res.status(404).send("Not Found")
});


app.listen(3000, () => {
  console.log('Server listening on port 3000');
});