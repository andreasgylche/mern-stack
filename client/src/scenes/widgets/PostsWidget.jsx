import { setPosts } from '../../state'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PostWidget from './PostWidget'

export default function Posts({ userId, isProfile = false }) {
  const dispatch = useDispatch()
  const posts = useSelector((state) => state.posts)
  const user = useSelector((state) => state.user)

  const getFeedPosts = async () => {
    const response = await fetch('http://localhost:3001/posts', {
      method: 'GET',
    })

    const posts = await response.json()
    dispatch(setPosts({ posts }))
  }

  const getUserPosts = async () => {
    const response = await fetch(`http://localhost:3001/posts/${user._id}`, {
      method: 'GET',
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
    <div className="flex flex-col gap-6 w-full">
      {posts && posts.map((post) => <PostWidget key={post._id} post={post} />)}
    </div>
  )
}
