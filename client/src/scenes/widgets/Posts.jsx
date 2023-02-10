import { setPosts } from '../../state'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Post from './Post'

export default function Posts({ userId, isProfile = false }) {
  const dispatch = useDispatch()
  const posts = useSelector((state) => state.posts)
  const token = useSelector((state) => state.token)

  const getFeedPosts = async () => {
    const response = await fetch('http://localhost:3001/posts', {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    })

    const posts = await response.json()
    dispatch(setPosts({ posts }))
  }

  const getUserPosts = async () => {
    const response = await fetch(`http://localhost:3001/posts/${userId}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    })

    const posts = await response.json()
    dispatch(setPosts({ posts }))
  }

  useEffect(() => {
    if (isProfile) {
      getUserPosts()
    } else {
      getFeedPosts()
    }
  }, [])

  return (
    <div className="mt-4">
      <h1 className="block text-lg font-semibold my-4">Feed Posts</h1>
      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  )
}
