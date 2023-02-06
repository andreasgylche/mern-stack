import React from 'react'
import Navbar from '../navbar'
import * as yup from 'yup'
import { Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { setPosts } from '../../state'
import Dropzone from 'react-dropzone'

const postSchema = yup.object().shape({
  title: yup.string().required('Field is required.'),
  description: yup
    .string()
    .max(120, 'Only 120 characters allowed for description.'),
})

const initialPostValues = {
  title: '',
  description: '',
}

export default function Form() {
  const dispatch = useDispatch()
  const { _id } = useSelector((state) => state.user)
  const token = useSelector((state) => state.token)

  const handleFormSubmit = async (values, onSubmitProps) => {
    const formData = new FormData()
    for (let value in values) {
      formData.append(value, values[value])
    }
    formData.append('userId', _id)
    formData.append('picturePath', values.picture.name)

    console.log(1)
    console.table(formData)

    const response = await fetch('http://localhost:3001/posts', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    })

    const posts = await response.json()
    onSubmitProps.resetForm()

    if (posts) {
      dispatch(setPosts({ posts }))
    }
  }

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialPostValues}
      validationSchema={postSchema}
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
          className="flex flex-col justify-center items-center w-fit"
          onSubmit={handleSubmit}
        >
          <label className="self-start" htmlFor="title">
            Post title:
          </label>
          <input
            className="rounded border border-indigo-200 mb-2 text-base px-4 py-2 mt-1"
            type="text"
            name="title"
            id="title"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.title}
          />
          {touched.title && errors.title && (
            <p className="text-sm text-rose-500 self-start">{errors.title}</p>
          )}
          <label className="self-start" htmlFor="description">
            Post description:
          </label>
          <textarea
            className="rounded border border-indigo-200 mb-2 text-base px-4 py-2 mt-1"
            name="description"
            id="description"
            rows="5"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.description}
          ></textarea>
          {touched.description && errors.description && (
            <p className="text-sm text-rose-500 self-start">
              {errors.description}
            </p>
          )}
          <div className="rounded border border-indigo-200 p-2 w-full mt-1 mb-2">
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
                    <p className="text-sm">Add picture here (max 30mb).</p>
                  ) : (
                    <p className="text-sm">{values.picture.name}</p>
                  )}
                </div>
              )}
            </Dropzone>
          </div>
          <button
            className="rounded bg-indigo-200 font-semibold py-2 px-4 mt-4 w-full"
            type="submit"
          >
            Create post
          </button>
        </form>
      )}
    </Formik>
  )
}
