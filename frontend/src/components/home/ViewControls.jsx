import React from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';

export default function BooksView({ showType, setShowType }) {
  return (
    <section className='flex justify-center items-center gap-x-4'>
      
      <button 
        className='bg-sky-300 hover-bg-sky-600 px-4 py-1 rounded-lg border-gray-500 border-2'
        onClick={() => setShowType('table')}
      >
        Table
      </button>
      <button 
        className='bg-sky-300 hover-bg-sky-600 px-4 py-1 rounded-lg border-gray-500 border-2'
        onClick={() => setShowType('cards')}
      >
        Cards
      </button>
    </section>
  );
}
