import React from 'react'

export default function UserImage({ size, image, username }) {
  return (
    <div className="flex justify-center items-center group-hover:cursor-pointer">
      <img
        className="rounded"
        src={
          image
            ? `http://localhost:3001/assets/${image}`
            : `https://ui-avatars.com/api/?name=${username}`
        }
        alt="user image"
        width={size}
        height={size}
      />
    </div>
  )
}
