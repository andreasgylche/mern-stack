import React from 'react'

export default function LoginPage() {
  return <div className='flex flex-col justify-center items-center w-full h-screen'>
    <h1 className='block text-lg font-semibold mb-4'>Login</h1>
    <form action="POST" className='flex flex-col gap-2'>
      <label htmlFor="email">Email</label>
      <input className='rounded border border-indigo-200' type="email" name="email" id="email" />
      <label htmlFor="password">Password</label>
      <input className='rounded border border-indigo-200' type="password" name="password" id="password" />
      <input className='rounded bg-indigo-200 font-semibold py-2 px-4 mt-4' type="submit" value="Login" />
    </form>
  </div>
}
