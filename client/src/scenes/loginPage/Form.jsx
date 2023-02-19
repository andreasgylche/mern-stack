import React, { useState } from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setLogin } from '../../state'
import Dropzone from 'react-dropzone'

const registerSchema = yup.object().shape({
  username: yup.string().required('Field is required.'),
  email: yup.string().email('Invalid email').required('Field is required.'),
  password: yup.string().required('Field is required.'),
  picture: yup.string().required('Field is required.'),
})

const loginSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Field is required.'),
  password: yup.string().required('Field is required.'),
})

const initialValuesRegister = {
  username: '',
  email: '',
  password: '',
  picture: '',
}

const initialValuesLogin = {
  email: '',
  password: '',
}

export default function Form() {
  const [pageType, setPageType] = useState('login')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isLogin = pageType === 'login'
  const isRegister = pageType === 'register'

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
      navigate('/home')
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
          className="flex flex-col justify-center items-center w-72"
          onSubmit={handleSubmit}
        >
          {isRegister && (
            <>
              <label className="self-start" htmlFor="username">
                Username:
              </label>
              <input
                className="rounded border border-indigo-200 mb-2 text-base px-4 py-2 mt-1 w-full"
                type="text"
                name="username"
                id="username"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.username}
              />
              {touched.username && errors.username && (
                <p className="text-sm text-rose-500 self-start">
                  {errors.username}
                </p>
              )}

              <label className="self-start" htmlFor="picture">
                Profile picture:
              </label>
              <div className="rounded border border-indigo-200 p-2 mt-1 mb-2 w-full">
                <Dropzone
                  acceptedFiles=".jpg,.jpeg,.png"
                  multiple={false}
                  onDrop={(acceptedFiles) => {
                    setFieldValue('picture', acceptedFiles[0])
                  }}
                >
                  {({ getRootProps, getInputProps }) => (
                    <div
                      className=" rounded border border-dashed border-indigo-200 hover:cursor-pointer p-2 w-full"
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
          <label className="self-start" htmlFor="email">
            Email:
          </label>
          <input
            className="rounded border border-indigo-200 mb-2 text-base px-4 py-2 mt-1 w-full"
            type="email"
            name="email"
            id="email"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.email}
          />
          {touched.email && errors.email && (
            <p className="text-sm text-rose-500 self-start">{errors.email}</p>
          )}
          <label className="self-start" htmlFor="password">
            Password:
          </label>
          <input
            className="rounded border border-indigo-200 mb-2 text-base px-4 py-2 mt-1 w-full"
            type="password"
            name="password"
            id="password"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.password}
          />
          {touched.password && errors.password && (
            <p className="text-sm text-rose-500 self-start">
              {errors.password}
            </p>
          )}
          <button
            className="rounded bg-indigo-200 font-semibold py-2 px-4 mt-4 w-full"
            type="submit"
          >
            {isLogin ? 'Login' : 'Register'}
          </button>

          <p
            className="mt-2 hover:underline hover:cursor-pointer text-sm"
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
