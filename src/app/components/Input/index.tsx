import React, { InputHTMLAttributes, forwardRef, useState } from 'react'
import { Icon } from '../Icon'

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
    <div className="relative">
      <input
        type={type}
        name={name}
        {...props}
        ref={ref}
        value={value}
        onChange={handleChange}
        className="w-full rounded-md border py-2 pl-10 pr-3"
      />
      <span className="absolute left-3 top-0 mt-3">
        <Icon name="Search" color="gray" size={20} />
      </span>
    </div>
  )
}

const Input = forwardRef<HTMLInputElement, InputProps>(InputComponent)
Input.displayName = 'Input'

export default Input
