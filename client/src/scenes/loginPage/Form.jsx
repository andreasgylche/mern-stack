import React, { useState } from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setLogin } from '../../state'
import Dropzone from 'react-dropzone'

const registerSchema = yup.object().shape({
  firstName: yup.string().required('Field is required.'),
  lastName: yup.string().required('Field is required.'),
  email: yup.string().email('Invalid email').required('Field is required.'),
  password: yup.string().required('Field is required.'),
  picture: yup.string().required('Field is required.'),
})

const loginSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Field is required.'),
  password: yup.string().required('Field is required.'),
})

const initialValuesRegister = {
  firstName: '',
  lastName: '',
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

  const handleFormSubmit = async (values, onSubmitProps) => {}

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
          className="flex flex-col justify-center items-center"
          onSubmit={handleSubmit}
        >
          {isLogin && (
            <>
              <label className="self-start" htmlFor="email">
                Email:
              </label>
              <input
                className="rounded border border-indigo-200 mb-2 text-base px-4 py-2 mt-1"
                type="email"
                name="email"
                id="email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
              />
              {touched.email && errors.email && (
                <p className="text-sm text-rose-500 self-start">
                  {errors.email}
                </p>
              )}
              <label className="self-start" htmlFor="password">
                Password:
              </label>
              <input
                className="rounded border border-indigo-200 mb-2 text-base px-4 py-2 mt-1"
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
              <input
                className="rounded bg-indigo-200 font-semibold py-2 px-4 mt-4"
                type="submit"
                value="Login"
              />
            </>
          )}

          {isRegister && (
            <>
              <label className="self-start" htmlFor="email">
                First Name:
              </label>
              <input
                className="rounded border border-indigo-200 mb-2 text-base px-4 py-2 mt-1"
                type="text"
                name="firstName"
                id="firstName"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
              />
              {touched.firstName && errors.firstName && (
                <p className="text-sm text-rose-500 self-start">
                  {errors.firstName}
                </p>
              )}
              <label className="self-start" htmlFor="email">
                Last Name:
              </label>
              <input
                className="rounded border border-indigo-200 mb-2 text-base px-4 py-2 mt-1"
                type="text"
                name="lastName"
                id="lastName"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
              />
              {touched.lastName && errors.lastName && (
                <p className="text-sm text-rose-500 self-start">
                  {errors.lastName}
                </p>
              )}
              <label className="self-start" htmlFor="email">
                Email:
              </label>
              <input
                className="rounded border border-indigo-200 mb-2 text-base px-4 py-2 mt-1"
                type="email"
                name="email"
                id="email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
              />
              {touched.email && errors.email && (
                <p className="text-sm text-rose-500 self-start">
                  {errors.email}
                </p>
              )}
              <label className="self-start" htmlFor="password">
                Password:
              </label>
              <input
                className="rounded border border-indigo-200 mb-2 text-base px-4 py-2 mt-1"
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
              <label className="self-start" htmlFor="picture">
                Profile picture:
              </label>
              <div className="rounded border border-indigo-200 p-2 w-full mt-1">
                <Dropzone
                  acceptedFiles=".jpg,.jpeg,.png"
                  multiple={false}
                  onDrop={(acceptedFiles) => {
                    setFieldValue('picture', acceptedFiles[0])
                  }}
                >
                  {({ getRootProps, getInputProps }) => (
                    <div
                      className=" rounded border border-dashed border-indigo-200 hover:cursor-pointer p-2"
                      {...getRootProps()}
                    >
                      <input {...getInputProps()} />
                      {!values.picture ? (
                        <p className="text-sm">Add picture here</p>
                      ) : (
                        <p className="text-sm">{values.picture.name}</p>
                      )}
                    </div>
                  )}
                </Dropzone>
              </div>
              <input
                className="rounded bg-indigo-200 font-semibold py-2 px-4 mt-4"
                type="submit"
                value="Register"
              />
            </>
          )}
        </form>
      )}
    </Formik>
  )
}
