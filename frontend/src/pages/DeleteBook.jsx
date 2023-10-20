import React, { useState } from 'react'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import axios from 'axios'
import { useSnackbar } from "notistack";
import { useNavigate, useParams } from 'react-router-dom'

export default function DeleteBook() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = () => {
    setLoading(true)
    axios.delete(`http://localhost:5000/books/${id}`)
    .then(() => {
      setLoading(false)
      enqueueSnackbar("Book deleted successfuly!", { variant: "success" });
      navigate('/')
    })
    .catch(error => {
      setLoading(false)
      enqueueSnackbar("Error deleting book", { variant: "error" });
      throw new Error(`Unexpected error: ${error}`)
    })
  }

  return (
    <section className='p-4'>
      <BackButton />
      <h2 className='text-3xl my-4'>Delete Book</h2>
      {loading ? <Spinner /> : ''}
      <article className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-2/4 p-8 mx-auto'>
        <h3 className='text-2xl'>Are you sure you want to delete this book?</h3>
        <button className='p-4 bg-red-600 text-white m-8 w-full rounded-lg' onClick={handleDelete}>Delete</button>
      </article>
    </section>
  )
}
