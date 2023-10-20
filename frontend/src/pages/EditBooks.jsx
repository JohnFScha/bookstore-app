import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useSnackbar } from "notistack";

export default function EditBooks() {
  const formRef = useRef(null);
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();


  console.log(book)

  useEffect(() => {
    setLoading(true)
    axios.get(`http://localhost:5000/books/${id}`)
    .then(response => {
      setBook(response.data.payload)
      setLoading(false)
    })
    .catch(error => {
      setLoading(false)
      throw new Error(`Unexpected error: ${error}`)
    })
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);

    setLoading(true);
    axios
      .put(`http://localhost:5000/books/${id}`, {
        title: formData.get("title"),
        author: formData.get("author"),
        publishYear: formData.get("publishYear"),
      })
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book edited successfuly!", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false)
        enqueueSnackbar("Error editing book", { variant: "error" });
        throw new Error(`Unexpected error: ${error}`);
      });
  };

  return (
    <section className="p-4">
      <BackButton />
      <h2 className="text-3xl my-4">Edit Book:</h2>
      {loading ? <Spinner /> : ''}
      <form
        onSubmit={handleSubmit}
        ref={formRef}
        className="flex flex-col border-2 border-sky-400 rounded-xl w-2/4 m-auto p-5 gap-5"
      >
        <label htmlFor="title" className="text-xl mr-4 text-gray-500 ">Title: {book.title}</label>
        <input
          type="text"
          name="title"
          placeholder="New title..."
          className="border-2 border-gray-500 px-4 py-2 w-full rounded-lg"
        />
        <label htmlFor="author" className="text-xl mr-4 text-gray-500 ">Author: {book.author}</label>
        <input
          type="text"
          name="author"
          placeholder="New author"
          className="border-2 border-gray-500 px-4 py-2 w-full rounded-lg"
        />
        <label htmlFor="publishYear" className="text-xl mr-4 text-gray-500 ">Publish Year: {book.publishYear}</label>
        <input
          type="number"
          name="publishYear"
          placeholder="New publish year"
          min={1800}
          max={2023}
          className="border-2 border-gray-500 px-4 py-2 w-full rounded-lg"
        />
        <button type="submit" className="p-2 bg-sky-300 m-8 rounded-lg border-2 border-gray-500">Create book</button>
      </form>
    </section>
  );
}
