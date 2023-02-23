import { useState } from 'react'
import { createContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './scenes/homePage'
import AuthModal from './scenes/modals/AuthModal'
import ProfilePage from './scenes/profilePage'

export const AuthModalContext = createContext()

function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false)

  return (
    <div className="app lg:max-w-[1440px] m-auto">
      <AuthModalContext.Provider value={[isAuthOpen, setIsAuthOpen]}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/u/:id" element={<ProfilePage />} />
            {/* <Route path="/g" element={<GamesPage />} /> */}
            {/* <Route path="/g/:id" element={<GamePage />} /> */}
            {/* <Route path="/p/:id" element={<PostPage />} /> */}
          </Routes>
          <AuthModal />
        </BrowserRouter>
      </AuthModalContext.Provider>
    </div>
  )
}

export default App
