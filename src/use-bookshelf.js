import { useState } from "react";

export default function useBookshelf() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [numberOfPages, setNumberOfPages] = useState("");

  return {
    title,
    author,
    genre,
    numberOfPages,
    setTitle,
    setAuthor,
    setGenre,
    setNumberOfPages,
  };
}
