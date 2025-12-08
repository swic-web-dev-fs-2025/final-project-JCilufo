import { useLocalStorage } from "@uidotdev/usehooks";
import { useState } from "react";

export default function useBookshelf() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [numberOfPages, setNumberOfPages] = useState("");
  const [books, setBooks] = useLocalStorage("books", []);
  const [selectedGenre, setSelectedGenre] = useState("all");

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

  // Derive unique genre options and sort them alphabetically
  const genreOptions = Array.from(
    new Set(
      (books || []).map((b) => (b.genre ? b.genre.trim() : "")).filter(Boolean)
    )
  ).sort((a, b) => a.localeCompare(b));

  // Use the filter method to sort the books alphabetically by author
  const filtered =
    selectedGenre === "all"
      ? books
      : (books || []).filter((b) => (b.genre || "") === selectedGenre);


  return {
    // Form state
    title,
    author,
    genre,
    numberOfPages,
    setTitle,
    setAuthor,
    setGenre,
    setNumberOfPages,
    clearForm,

    // Books state
    addBook,
    deleteBook,

    // Sorting
    selectedGenre,
    setSelectedGenre,
    genreOptions,
    groupedBooks,
  };
}
