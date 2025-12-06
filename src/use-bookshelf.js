import { useLocalStorage } from "@uidotdev/usehooks";
import { useState } from "react";

export default function useBookshelf() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [numberOfPages, setNumberOfPages] = useState("");
  const [books, setBooks] = useLocalStorage("books", []);

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
