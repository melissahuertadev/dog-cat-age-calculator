function Select({ id, label, value, onChange, options, placeholder, error }) {
  return (
    <div className="col-span-1">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm/6 font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
      )}
      <div className="mt-2">
        <select
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          className={`w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-brown-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:*:bg-gray-800 dark:focus:outline-brown-500 ${
            error ? "border-red-500 ring-red-500" : ""
          }`}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

export default Select;
