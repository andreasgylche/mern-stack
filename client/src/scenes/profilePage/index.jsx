import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import UserImage from '../../components/UserImage'

import Navbar from '../navbar'
import Posts from '../widgets/Posts'

export default function ProfilePage() {
  const [user, setUser] = useState({})
  const { id } = useParams()
  const token = useSelector((state) => state.token)

  const followerCount = user.followers
    ? Object.keys(user.followers).length
    : '0'

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${id}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    })

    const data = await response.json()
    setUser(data)
  }

  useEffect(() => {
    getUser()
  }, [id])

  if (!user) return null

  return (
    <div className="flex flex-col items-center w-full h-screen">
      <Navbar />
      <h1 className="block text-lg font-semibold my-4">Profile page</h1>

      <div className="flex flex-col gap-3 items-center bg-neutral-100 p-4 rounded">
        {user.picturePath && <UserImage size={48} image={user.picturePath} />}

        <div className="flex flex-col">
          <p className="font-semibold">{user.username}</p>
          <span className="text-sm">
            {followerCount ? followerCount : '0'} followers
          </span>
        </div>
        <p>Total posts: {user.totalPosts}</p>
        <p>Total likes: {user.totalLikes}</p>
      </div>

      <Posts userId={id} isProfile />
    </div>
  )
}
