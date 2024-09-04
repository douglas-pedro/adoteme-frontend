interface InputProps {
  type?: string
  name?: string
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
}

export default function Input({
  type = 'text',
  name = '',
  placeholder = '',
  value,
  onChange,
  className = '',
}: InputProps) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 placeholder-bold placeholder-white  ${className}`}
    />
  )
}
