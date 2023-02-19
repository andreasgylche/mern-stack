import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import UserImage from '../../components/UserImage'
import { setLogout } from '../../state'

export default function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)

  return (
    <div className="w-full flex justify-between items-center h-12 bg bg-indigo-200 px-4">
      <p
        className="font-semibold hover:cursor-pointer"
        onClick={() => navigate('/home')}
      >
        MERN Stack
      </p>
      <div className="flex gap-4 items-center">
        <div className="flex items-center gap-2">
          <UserImage
            size={32}
            image={user.picturePath}
            onClick={() => navigate(`/profile/${user._id}`)}
          />
          <p
            className="hover:cursor-pointer hover:underline"
            onClick={() => navigate(`/profile/${user._id}`)}
          >
            {user.username}
          </p>
        </div>
        <p
          className="hover:cursor-pointer hover:underline hover:text-rose-500"
          onClick={() => {
            dispatch(setLogout())
            navigate('/')
          }}
        >
          Log out
        </p>
      </div>
    </div>
  )
}
