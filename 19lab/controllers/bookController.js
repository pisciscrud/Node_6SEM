const Book = require('../models/book');


exports.getBooks = async  (req, res,next) => {
    try {
        const books = await Book.findAll();
        res.json(books);
        //res.render('book', { books });
    } catch (err) {
        next(err);
    }
   
}

exports.addBook = function (request, response){
    response.render('bookForm');
};

exports.createBook = async (req, res, next) => {
    try{

        const { title, author, description } = req.body;
        const book = await Book.create({ title, author, description });
       // res.json(book);
        res.redirect('/books');

    }
    catch(err){
        next(err);
    }
    console.log(req.body);
    const body = req.body;
    Book.create({ title: body.title, author: body.author, description: body.description }).then(u => res.json(u))
        .catch(next);
}



exports.updateBook =  async (req, res,next) => {
    try {
        const { id, title, author,description } = req.body;
        const book = await Book.update({ title, author,description }, { where: { id } });
        if(book==0) res.status(404).json({ error: "Book not found" });
        else {
        res.json(req.body);
        }
      } catch (error) {
        next(error);
      } 
}

exports.deleteBook = async  (req, res, next ) => {
    try {
        const book =  await Book.destroy({
            where: { id: req.params.id }
        });
        if(book==0) res.status(404).json({ error: "Book not found" });
        res.json('Book deleted');
    } catch (error) {
        
        next(error);
    }
} 