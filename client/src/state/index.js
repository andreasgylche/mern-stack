import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  token: null,
  posts: [],
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
    },
    setLogout: (state) => {
      state.user = null
      state.token = null
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post
        return post
      })
      state.posts = updatedPosts
    },
    setFollow: (state, action) => {
      if (state.user) {
        state.user.following = action.payload.following
      } else {
        console.error('Followers/following is non-existent.')
      }
    },
  },
})

export const { setLogin, setLogout, setPosts, setPost, setFollow } =
  authSlice.actions
export default authSlice.reducer
