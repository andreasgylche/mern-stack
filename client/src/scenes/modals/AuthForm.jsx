import React, { useState } from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setLogin } from '../../state'
import Dropzone from 'react-dropzone'
import { useContext } from 'react'
import { AuthModalContext } from '../../App'

const registerSchema = yup.object().shape({
  username: yup.string().required('Username is required.'),
  email: yup.string().email('Invalid email').required('Email is required.'),
  password: yup.string().required('Password is required.'),
  picture: yup.string().required('Picture is required.'),
})

const loginSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required.'),
  password: yup.string().required('Password is required.'),
})

const initialValuesRegister = {
  username: 'Test',
  email: '',
  password: '',
  picture: '',
}

const initialValuesLogin = {
  email: '',
  password: '',
}

export default function AuthForm() {
  const [pageType, setPageType] = useState('login')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isLogin = pageType === 'login'
  const isRegister = pageType === 'register'
  const [isAuthOpen, setIsAuthOpen] = useContext(AuthModalContext)

  const register = async (values, onSubmitProps) => {
    const formData = new FormData()
    for (let value in values) {
      formData.append(value, values[value])
    }
    formData.append('picturePath', values.picture.name)

    const savedUserResponse = await fetch(
      'http://localhost:3001/auth/register',
      {
        method: 'POST',
        body: formData,
      }
    )
    const savedUser = await savedUserResponse.json()
    onSubmitProps.resetForm()

    if (savedUser) {
      setPageType('login')
    }
  }

  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch('http://localhost:3001/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    })
    const loggedIn = await loggedInResponse.json()
    onSubmitProps.resetForm()

    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      )
      navigate('/')
      setIsAuthOpen(false)
    }
  }

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps)
    if (isRegister) await register(values, onSubmitProps)
  }

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form
          className="flex flex-col justify-center items-center w-full mt-6"
          onSubmit={handleSubmit}
        >
          {isRegister && (
            <>
              <label className="self-start" htmlFor="username">
                Username:
              </label>
              <input
                className="rounded bg-[#f0f0f0] dark:bg-neutral-700 border-2 border-teal-500/50 mb-2 text-base px-4 py-2 mt-2 w-full"
                type="text"
                name="username"
                id="username"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.username}
              />
              {touched.username && errors.username && (
                <p className="text-xs text-rose-500 self-start">
                  {errors.username}
                </p>
              )}

              <label className="self-start mt-2" htmlFor="picture">
                Profile picture:
              </label>
              <div className="rounded border border-teal-500 p-2 my-2 w-full">
                <Dropzone
                  acceptedFiles=".jpg,.jpeg,.png"
                  multiple={false}
                  onDrop={(acceptedFiles) => {
                    setFieldValue('picture', acceptedFiles[0])
                  }}
                >
                  {({ getRootProps, getInputProps }) => (
                    <div
                      className="rounded border border-dashed border-teal-500/50 hover:cursor-pointer p-2 w-full"
                      {...getRootProps()}
                    >
                      <input name="picture" {...getInputProps()} />
                      {!values.picture ? (
                        <p className="text-sm">Add picture here</p>
                      ) : (
                        <p className="text-sm">{values.picture.name}</p>
                      )}
                    </div>
                  )}
                </Dropzone>
              </div>
            </>
          )}
          <label className="self-start mt-2" htmlFor="email">
            Email:
          </label>
          <input
            className="rounded bg-[#f0f0f0] dark:bg-neutral-700 border-2 border-teal-500/50 mb-2 text-base px-4 py-2 mt-2 w-full"
            type="email"
            name="email"
            id="email"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.email}
          />
          {touched.email && errors.email && (
            <p className="text-xs text-rose-500 self-start">{errors.email}</p>
          )}
          <label className="self-start mt-2" htmlFor="password">
            Password:
          </label>
          <input
            className="rounded bg-[#f0f0f0] dark:bg-neutral-700 border-2 border-teal-500/50 mb-2 text-base px-4 py-2 mt-2 w-full"
            type="password"
            name="password"
            id="password"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.password}
          />
          {touched.password && errors.password && (
            <p className="text-xs text-rose-500 self-start">
              {errors.password}
            </p>
          )}
          <button
            className="rounded bg-teal-500 font-semibold py-2 px-4 mt-4 w-full"
            type="submit"
          >
            {isLogin ? 'Sign in' : 'Sign up'}
          </button>

          <p
            className="mt-4 hover:underline hover:cursor-pointer text-sm self-start"
            onClick={() => setPageType(isLogin ? 'register' : 'login')}
          >
            {isLogin
              ? "Don't have an account? Sign up here."
              : 'Already have an account? Login here.'}
          </p>
        </form>
      )}
    </Formik>
  )
}
