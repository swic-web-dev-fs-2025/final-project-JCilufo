import useBookshelf from "./use-bookshelf";

export default function Bookshelf() {
  const {
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

    // Sorting state
    selectedGenre,
    setSelectedGenre,
    genreOptions,
    groupedBooks,
  } = useBookshelf();

  const handleSubmit = (e) => {
    e.preventDefault();
    addBook();
    clearForm();
    setSelectedGenre("all");
  };

  return (
    <main>
      <h1 className="text-3xl font-bold mt-3 text-center">Bookshelf</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 flex flex-col items-stretch w-md lg:w-xl 2xl:w-4xl mx-auto p-4 border border-gray-300 rounded-lg mt-3"
      >
        {/* Title Field */}
        <FormField
          id="title"
          name="title"
          label="Title:"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/*Author Field*/}
        <FormField
          id="author"
          name="author"
          label="Author:"
          type="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        {/*Genre Field*/}
        <FormField
          id="genre"
          name="genre"
          label="Genre:"
          type="genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />

        {/*Number of Pages Field*/}
        <FormField
          id="numberOfPages"
          name="numberOfPages"
          label="# of Pages:"
          type="numberOfPages"
          value={numberOfPages}
          onChange={(e) => setNumberOfPages(e.target.value)}
        />

        {/*Submit Button*/}
        <Button type="submit" text="Add Book" />
      </form>
    </main>
  );
}

function Button({ disabled, type = "button", text }) {
  return (
    <button
      type={type}
      disabled={disabled}
      className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {text}
    </button>
  );
}

function FormField({
  value,
  onChange,
  label,
  type = "text",
  name,
  id,
  required = true,
  validationMessage,
}) {
  return (
    <div>
      <label htmlFor="bookInfo" className="mb-1 block text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className="w-full rounded border px-3 py-2"
        required={required}
      />
      {validationMessage}
    </div>
  );
}
