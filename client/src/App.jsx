import { useState } from 'react'
import { createContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './scenes/homePage'
import LoginPage from './scenes/loginPage'
import AuthModal from './scenes/modals/AuthModal'
import ProfilePage from './scenes/profilePage'

export const AuthModalContext = createContext()

function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false)

  return (
    <div className="app">
      <AuthModalContext.Provider value={[isAuthOpen, setIsAuthOpen]}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/u/:id" element={<ProfilePage />} />
          </Routes>
          <AuthModal />
        </BrowserRouter>
      </AuthModalContext.Provider>
    </div>
  )
}

export default App
