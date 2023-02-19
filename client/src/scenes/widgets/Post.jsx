import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setPost, setFollow } from '../../state'

export default function Post({ post }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const token = useSelector((state) => state.token)
  const user = useSelector((state) => state.user)

  const userImage = post.user.picturePath
    ? `http://localhost:3001/assets/${post.user.picturePath}`
    : `https://ui-avatars.com/api/?name=${post.user.username}`
  const postImage = `http://localhost:3001/assets/${post.picturePath}`
  const likeCount = Object.keys(post.likes).length
  const isLiked = Boolean(post.likes[user._id])
  const isFollow = Boolean(user.following[post.user._id])
  const isOwn = Boolean(post.user._id == user._id)

  const handleLike = async () => {
    const response = await fetch(
      `http://localhost:3001/posts/${post._id}/like`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user._id }),
      }
    )

    const updatedPost = await response.json()
    dispatch(setPost({ post: updatedPost }))
  }

  const handleFollow = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${user._id}/${post.user._id}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    )

    const data = await response.json()
    dispatch(setFollow({ following: data }))
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
      <div className="flex justify-between items-center mt-1">
        <div className="flex gap-2 items-center">
          <img className="w-6 h-6 rounded" src={userImage} alt="user image" />
          <div className="flex gap-2 items-center">
            <p
              className="hover:cursor-pointer hover:underline"
              onClick={() => navigate(`/profile/${post.user._id}`)}
            >
              {post.user.username}
            </p>
            {!isOwn && (
              <button
                className="text-xs font-semibold rounded bg-indigo-200 px-2 py-1"
                onClick={handleFollow}
              >
                {isFollow ? 'Unfollow' : 'Follow'}
              </button>
            )}
          </div>
        </div>

        <p
          className="text-sm hover:cursor-pointer hover:underline ml-auto mr-1"
          onClick={handleLike}
        >
          {isLiked ? 'Remove like' : 'Like'}
        </p>
        <span className="text-sm font-bold">{likeCount ? likeCount : '0'}</span>
      </div>
      <p className="text-sm">{post.description}</p>
    </div>
  )
}
