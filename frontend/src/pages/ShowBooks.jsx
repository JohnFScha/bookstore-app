import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'

export default function ShowBooks() {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true)
    axios.get(`http://localhost:5000/books/${id}`)
    .then(response => {
      setBook(response.data.payload)
      console.log(response)
      setTimeout(() => {
        setLoading(false)
      }, 1500);
    })
    .catch(error => {
      throw new Error(`Unexpected error: ${error}`)
    })
  }, []);

  return (
    <section className='p-4'>
      <BackButton />
      <h2 className='text-3xl my-4'>Show Book</h2>
      {loading? (
        <Spinner />
      ) : (
        <article className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>ID</span>
            <span>{book._id}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Title</span>
            <span>{book.title}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Author</span>
            <span>{book.author}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Publish Year</span>
            <span>{book.publishYear}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Created at</span>
            <span>{new Date(book.createdAt).toString()}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Last updated at</span>
            <span>{new Date(book.updatedAt).toString()}</span>
          </div>
        </article>
      )}
    </section>
  )
}
