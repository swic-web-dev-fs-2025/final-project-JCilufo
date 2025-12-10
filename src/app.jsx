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

        {/* Author Field */}
        <FormField
          id="author"
          name="author"
          label="Author:"
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        {/* Genre Field */}
        <FormField
          id="genre"
          name="genre"
          label="Genre:"
          type="text"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />

        {/* Number of Pages Field */}
        <FormField
          id="numberOfPages"
          name="numberOfPages"
          label="# of Pages:"
          type="number"
          value={numberOfPages}
          onChange={(e) => {
            const v = e.target.value;
            setNumberOfPages(v === "" ? "" : Number(v));
          }}
          inputProps={{
            min: 0,
            step: 1,
            inputMode: "numeric",
            pattern: "\\d*",
          }}
        />

        {/* Submit Button */}
        <div className="self-center">
          <Button type="submit" text="Add Book" />
        </div>
      </form>

      {/* Filter Dropdown */}
      <div className="mt-4 flex items-center justify-center">
        <label className="text-md 2xl:text-lg font-medium">
          Filter by genre:
        </label>
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="ml-2 rounded border px-12 lg:px-14 py-1"
        >
          <option value="all">All</option>
          {genreOptions.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      {/* List of Books */}
      <ListOfBooks groupedBooks={groupedBooks} onDelete={deleteBook} />
    </main>
  );
}

function Button({ disabled, type = "button", text }) {
  return (
    <button
      type={type}
      disabled={disabled}
      className="rounded bg-blue-600 px-4 py-1 text-white hover:bg-blue-700 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
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
}) {
  return (
    <div className="grid grid-cols-3 2xl:grid-cols-2 items-center">
      <label htmlFor={id} className="text-md lg:text-lg xl:text-xl font-medium">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className="col-span-2 2xl:col-span-1 rounded border py-1 lg:py-2 pl-2"
        required={required}
      />
    </div>
  );
}

function ListOfBooks({ groupedBooks = [], onDelete }) {
  if (!groupedBooks || groupedBooks.length === 0) {
    return (
      <p className="text-slate-400 text-center md:text-lg xl:text-xl pt-10 border rounded-lg border-gray-300 w-md md:w-2xl lg:w-3xl xl:w-4xl 2xl:w-7xl mx-auto h-75 mt-5">
        No books yet...
      </p>
    );
  }

  return (
    <div className="w-md md:w-2xl lg:w-3xl xl:w-4xl 2xl:w-7xl mx-auto mt-1">
      {groupedBooks.map(({ genre, books }) => (
        <div key={genre} className="mb-4 lg:mb-8">
          <h2 className="text-2xl font-bold mb-4 text-slate-700">{genre}</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-blue-100">
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Title
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Author
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Pages
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id} className="hover:bg-slate-50">
                  <td className="border border-gray-300 px-4 py-2 2xl:py-4 2xl:text-lg">
                    {book.title}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 2xl:text-lg">
                    {book.author}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 2xl:text-lg">
                    {book.numberOfPages}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <button
                      onClick={() => onDelete(book.id)}
                      className="rounded bg-red-500 mt-1 text-white hover:bg-red-600 cursor-pointer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18 18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
