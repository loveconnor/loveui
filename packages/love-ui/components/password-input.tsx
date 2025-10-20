"use client"

import React from 'react'
import { Input, InputGroup } from './input'
import { Eye, EyeOff } from 'lucide-react'

type PasswordInputProps = {
  name?: string
  autoComplete?: string
  placeholder?: string
  id?: string
}

export function PasswordInput({ name = 'password', autoComplete, placeholder, id }: PasswordInputProps) {
  const [show, setShow] = React.useState(false)

  return (
    <InputGroup>
      <Input
        type={show ? 'text' : 'password'}
        name={name}
        autoComplete={autoComplete}
        id={id}
        placeholder={placeholder}
        aria-label="Password"
      />
      <button
        type="button"
        onClick={() => setShow((v) => !v)}
        data-slot="icon"
        className="!pointer-events-auto !top-1/2 -translate-y-1/2 !my-0 !mx-0 p-0 leading-none text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-white"
        aria-label={show ? 'Hide password' : 'Show password'}
      >
        {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </InputGroup>
  )
}
