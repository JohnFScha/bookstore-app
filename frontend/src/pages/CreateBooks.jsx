import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

export default function CreateBooks() {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);

    setLoading(true);
    axios
      .post("http://localhost:5000/books/", {
        title: formData.get("title"),
        author: formData.get("author"),
        publishYear: formData.get("publishYear"),
      })
      .then(() => {
        setTimeout(() => {
          setLoading(false)
        }, 1500);
        enqueueSnackbar("Book created successfuly!", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error creating book", { variant: "error" });
        throw new Error(`Unexpected error: ${error}`);
      });
  };

  return (
    <section className="p-4">
      <BackButton />
      <h2 className="text-3xl my-4">Create Book:</h2>
      {loading ? <Spinner /> : ""}
      <form
        onSubmit={handleSubmit}
        ref={formRef}
        className="flex flex-col border-2 border-sky-400 rounded-xl w-2/4 m-auto p-5 gap-5"
      >
        <label htmlFor="title" className="text-xl mr-4 text-gray-500 ">
          Title
        </label>
        <input
          type="text"
          name="title"
          className="border-2 border-gray-500 px-4 py-2 w-full rounded-lg"
        />
        <label htmlFor="author" className="text-xl mr-4 text-gray-500 ">
          Author
        </label>
        <input
          type="text"
          name="author"
          className="border-2 border-gray-500 px-4 py-2 w-full rounded-lg"
        />
        <label htmlFor="publishYear" className="text-xl mr-4 text-gray-500 ">
          Publish Year
        </label>
        <input
          type="number"
          name="publishYear"
          min={1800}
          max={2023}
          className="border-2 border-gray-500 px-4 py-2 w-full rounded-lg"
        />
        <button
          type="submit"
          className="p-2 bg-sky-300 m-8 rounded-lg border-2 border-gray-500"
        >
          Create book
        </button>
      </form>
    </section>
  );
}
