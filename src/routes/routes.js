const express = require('express');
const {getBooks, getOneBook, createBook, updateBook, deleteBook} = require('../controller/BookController');

const router = express.Router();

/* Endpoints */ 

router.get('/books', getBooks)

router.get('/books/:id', getOneBook)

router.post('/books', createBook)

router.patch('/books/:id', updateBook)

router.delete('/books/:id', deleteBook)

module.exports = router;