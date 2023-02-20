import React from 'react'

export default function UserImage({ size, image }) {
  return (
    <div className={`flex justify-center items-center cursor-pointer`}>
      <img
        className="rounded"
        src={`http://localhost:3001/assets/${image}`}
        alt="user image"
        width={size}
        height={size}
      />
    </div>
  )
}
