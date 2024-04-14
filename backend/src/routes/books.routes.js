import { Router } from "express";
import bookModel from "../models/bookModel.js";

const bookRouter = Router({caseSensitive: false});

// Get all books
bookRouter.get('/', async (req, res) => {
  console.log('------- Get all books -------')
  const { limit } = req.query;

  try {
    const books = await bookModel.find().limit(limit);

    if(!books) {
      return res.status(404).send({message: 'Not found'})
    }

    return res.status(200).send({message: 'Success', count: books.length, payload: books})
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`)
  }
})

// Get a book by id
bookRouter.get('/:id', async (req, res) => {
  console.log('------- Get book by id -------')
  const { id } = req.params;

  try {
    const book = await bookModel.findById(id);

    if(!book) {
      return res.status(404).send({message: 'Not found'})
    }

    return res.status(200).send({message: 'Success', payload: book})
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`)
  }
})

// Create a book
bookRouter.post("/", async (req, res) => {
  console.log('------- Create book -------')
  const {title, author, publishYear} = req.body

  try {
  
    if(!title || !author || !publishYear) {
      return res.status(400).send({ message: `Required information missing: ${title}, ${author}, ${publishYear}`})
    }
    
    const newBook = {
      title: title,
      author: author,
      publishYear: publishYear
    }

    const book = await bookModel.create(newBook);

    return res.status(201).send({message: 'New book created', item: book})

  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`)
  }
})

// Update a book
bookRouter.put("/:id", async (req, res) => {
  console.log('------- Edit book -------')

  const { id } = req.params
  const {title, author, publishYear} = req.body;
  
  try {
    if(!title || !author || !publishYear) {
      return res.status(400).send({ message: 'Required information missing.'})
    }
    
    const updatedBook = {
      title: title,
      author: author,
      publishYear: publishYear
    }

    const book = await bookModel.findByIdAndUpdate(id, updatedBook);

    return res.status(201).send({message: 'New book created', item: book})

  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`)
  }
})

// Delete a book by ID
bookRouter.delete('/:id', async (req, res) => {
  console.log('------- Delete book -------')

  const { id } = req.params;

  try {
    const book = await bookModel.findByIdAndDelete(id);

    if(!book) {
      return res.status(404).send({message: 'Not found'})
    }

    return res.status(200).send({message: 'Book deleted successfuly'})
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`)
  }
})


export default bookRouter;