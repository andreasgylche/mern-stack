import React from 'react'
import Form from './Form'

export default function LoginPage() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <h1 className="block text-lg font-semibold mb-4">Login</h1>
      <Form />
    </div>
  )
}
