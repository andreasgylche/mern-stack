import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setPost } from '../../state'

export default function Post({ post }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const token = useSelector((state) => state.token)
  const loggedInUser = useSelector((state) => state.user._id)
  // const isLiked = Boolean(post.likes[loggedInUser])

  const fullName = `${post.firstName} ${post.lastName}`
  const userImage = `http://localhost:3001/assets/${post.userPicturePath}`
  const postImage = `http://localhost:3001/assets/${post.picturePath}`
  // const likesCount = Object.keys(post.likes).length

  const handleLike = async () => {
    const response = await fetch(
      `http://localhost:3001/posts/${post._id}/like`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: loggedInUser }),
      }
    )

    const updatedPost = await response.json()
    dispatch(setPost({ post: updatedPost }))
  }

  return (
    <div className="w-96 flex flex-col gap-2">
      <div>
        <img
          className="w-full h-72 object-cover rounded"
          src={postImage}
          alt="post image"
        />
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <img
            className="w-6 h-6 rounded-full"
            src={userImage}
            alt="user image"
          />
          <p
            className="hover:cursor-pointer hover:underline"
            onClick={() => navigate(`/profile/${post.userId}`)}
          >
            {fullName}
          </p>
        </div>
        <p
          className="text-sm hover:cursor-pointer hover:underline ml-auto mr-1"
          onClick={handleLike}
        >
          Like
        </p>
        <span className="text-sm font-bold">
          {post.likes ? post.likes : '0'}
        </span>
      </div>
      <p className="text-sm">{post.description}</p>
    </div>
  )
}
