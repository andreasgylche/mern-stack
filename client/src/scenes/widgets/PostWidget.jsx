import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setPost, setFollow } from '../../state'
import { getRelativeTime } from '../../utils/helpers'
import UserImage from '../../components/UserImage'
import DotDivider from '../../components/DotDivider'
import { HiOutlineHeart, HiHeart } from 'react-icons/hi'
import { BiComment, BiShareAlt } from 'react-icons/bi'
import { useContext } from 'react'
import { AuthModalContext } from '../../App'

export default function PostWidget({ post }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const token = useSelector((state) => state.token)
  const user = useSelector((state) => state.user)
  const [isAuthOpen, setIsAuthOpen] = useContext(AuthModalContext)

  const postImage = `http://localhost:3001/assets/${post.picturePath}`
  const likeCount = Object.keys(post.likes).length
  const isLiked = Boolean(post.likes[user?._id])
  const isFollow = Boolean(user?.following[post.user._id])
  const isOwn = Boolean(post.user._id == user?._id)
  const relativeTime = getRelativeTime(post.createdAt)

  const handleLike = async () => {
    if (!user) {
      return setIsAuthOpen(true)
    }

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
    if (!user) {
      return setIsAuthOpen(true)
    }

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

  const handleCopyAndShare = () => {}

  return (
    <div className="flex gap-6 rounded bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-50 w-full p-6 h-56">
      <div className="w-full flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <button
            className="flex items-center gap-2 group"
            onClick={() => navigate(`/u/${post.user._id}`)}
          >
            <UserImage
              size={24}
              image={post.user.picturePath}
              username={post.user.username}
            />
            <span className="text-xs group-hover:underline group-hover:cursor-pointer">
              u/{post.user.username}
            </span>
          </button>
          <DotDivider />
          <span className="text-xs">{relativeTime}</span>
        </div>
        <div className="flex flex-col gap-2">
          <h2
            className="text-xl overflow-hidden hover:underline cursor-pointer line-clamp-2"
            onClick={() => navigate(`/p/${post._id}`)}
          >
            {post.title}
          </h2>
          <p className="opacity-70 dark:opacity-40 text-sm line-clamp-2 mb-auto">
            {post.description}
          </p>
        </div>
        <div className="mt-auto flex items-center gap-4">
          <button
            className="flex items-center gap-1 text-sm hover:underline cursor-pointer"
            onClick={handleLike}
          >
            {isLiked ? (
              <HiHeart size={16} color="#ef4444" />
            ) : (
              <HiOutlineHeart size={16} />
            )}
            {likeCount}
            {likeCount != 1 ? ' Likes' : ' Like'}
          </button>
          <button
            className="flex items-center gap-1 text-sm hover:underline cursor-pointer"
            onClick={() => navigate(`/p/${post._id}`)}
          >
            <BiComment size={16} />
            {post.comments.length}
            {post.comments.length != 1 ? ' Comments' : ' Comment'}
          </button>
          <button
            className="flex items-center gap-1 text-sm hover:underline cursor-copy"
            onClick={() =>
              navigator.clipboard.writeText(
                `http://localhost:3000/p/${post._id}`
              )
            }
          >
            <BiShareAlt size={16} />
            Share
          </button>
        </div>
      </div>
      <img
        className="object-cover rounded aspect-square ml-auto w-44 h-full"
        src={postImage}
        alt="post image"
      />
    </div>
  )
}
