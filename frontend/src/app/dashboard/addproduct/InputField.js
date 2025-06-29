const InputField = ({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
  required,
}) => (
  <div className="sm:col-span-1">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      required={required}
    />
  </div>
);
export default InputField;
