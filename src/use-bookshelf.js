import { useLocalStorage } from "@uidotdev/usehooks";
import { useState } from "react";

export default function useBookshelf() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [numberOfPages, setNumberOfPages] = useState("");
  const [books, setBooks] = useLocalStorage("books", []);

  const addBook = () => {
    const newBook = {
      id: Date.now(),
      title: title.trim(),
      author: author.trim(),
      genre: genre.trim(),
      numberOfPages: Number(numberOfPages),
    };

    setBooks((prev) => [...prev, newBook]);
  };

  const clearForm = () => {
    setTitle("");
    setAuthor("");
    setGenre("");
    setNumberOfPages("");
  };

  const deleteBook = (id) => {
    setBooks((prev) => prev.filter((book) => book.id !== id)); // Remove todo with matching id
  };

  return {
    title,
    author,
    genre,
    numberOfPages,
    books,
    setTitle,
    setAuthor,
    setGenre,
    setNumberOfPages,
    setBooks,
  };
}
