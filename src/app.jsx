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
