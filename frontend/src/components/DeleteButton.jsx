import { useState } from "react";
import axios from "axios";
import { MdOutlineDelete } from "react-icons/md";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export default function DeleteButton({book}) {
  const [loading, setLoading] = useState(false);

  const handleDelete = (id) => {
    MySwal.fire({
      icon: 'warning',
      title: 'Delete book?',
      text: 'Confirm you want to delete this book',
      confirmButtonText: 'Delete',
      showCancelButton: true,
      cancelButtonText: 'Cancel'
    }).then(result => {
      if (result.isConfirmed) {
        setLoading(true)
        axios.delete(`http://localhost:5000/books/${id}`)
        .then(() => {
          setTimeout(() => {
            setLoading(false)
          }, 1500);
          MySwal.fire({
            icon: 'sucess',
            title: 'Book deleted succesfully'
          })
          window.location.reload()
        })
        .catch(error => {
          setLoading(false)
          MySwal.fire({
            icon: 'error',
            title: 'Error deleting book'
          })
          throw new Error(`Unexpected error: ${error}`)
        })
      } 
    })
  }

  return (
    <button onClick={() => handleDelete(book._id)}>
      <MdOutlineDelete className="text-2xl text-red-600 hover:text-black" />
    </button>
  );
}
