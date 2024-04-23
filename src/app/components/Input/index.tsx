import React, { InputHTMLAttributes, forwardRef, useState } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  onSearch?: (value: string) => void
}

function InputComponent(
  { type = 'text', name = '', onSearch, ...props }: InputProps,
  ref: React.Ref<HTMLInputElement>,
) {
  const [value, setValue] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setValue(value)
    if (onSearch) {
      onSearch(value)
    }
  }

  return (
    <>
      <input
        type={type}
        name={name}
        {...props}
        ref={ref}
        value={value}
        onChange={handleChange}
      />
    </>
  )
}

const Input = forwardRef<HTMLInputElement, InputProps>(InputComponent)
Input.displayName = 'Input'

export default Input
