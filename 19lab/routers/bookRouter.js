const express = require("express");
const bookController = require("../controllers/bookController.js");
const bookRouter = express.Router();

bookRouter.get('/', bookController.getBooks);
bookRouter.get('/form', bookController.addBook);
bookRouter.post('/form', bookController.createBook);
bookRouter.put('/form', bookController.updateBook);
bookRouter.delete('/form/:id', bookController.deleteBook);

 
module.exports = bookRouter;