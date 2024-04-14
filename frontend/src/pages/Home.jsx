import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md'
import BookTable from '../components/home/BookTable';
import BookCard from '../components/home/BookCard';
import BooksView from '../components/home/ViewControls';

export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showType, setShowType] = useState('table');
  
  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:5000/books')
    .then(response => {
      setBooks(response.data.payload)
      setTimeout(() => {
        setLoading(false)
      }, 1500);
    })
    .catch(error => {
      throw new Error(`Unexpected Error: ${error}`)
    })
  }, []);

  return (
    <main className='p-4'>
      <section className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Books List:</h1>
        <BooksView showType={showType} setShowType={setShowType} />
        <Link to={'/books/create'}>
          <MdOutlineAddBox className='text-sky-800 text-4xl' />
        </Link>
      </section>
    {loading ? <Spinner /> : showType === 'table' ? <BookTable books={books} /> : <BookCard books={books}/>}
    </main>
  )
}
