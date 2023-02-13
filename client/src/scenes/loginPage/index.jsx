import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Form from './Form'

export default function LoginPage() {
  const user = useSelector((state) => state.user)
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate('/home')
    }
  }, [])

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <h1 className="block text-lg font-semibold mb-4">MERN Stack</h1>
      <Form />
    </div>
  )
}
