import React from 'react'

export default function UserImage({ size, image }) {
  return (
    <div
      className={`flex justify-center cursor-pointer items-center w-[${size}] h-[${size}]`}
    >
      <img
        className="rounded-full"
        src={`http://localhost:3001/assets/${image}`}
        alt="user image"
        width={size}
        height={size}
      />
    </div>
  )
}
