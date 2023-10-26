import { useState, createContext } from 'react'
import { getAccessToken, getProfile } from '~/utils/auth'

export const AppContext = createContext()

const initialState = {
  isAuthenticated: Boolean(getAccessToken()),
  profile: getProfile()
}

export const AppProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(initialState.isAuthenticated)
  const [showModal, setShowModal] = useState(false)
  const [profile, setProfile] = useState(initialState.profile)
  const toggleModal = () => setShowModal(!showModal)

  return (
    <AppContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, showModal, setShowModal, toggleModal, profile, setProfile }}
    >
      {children}
    </AppContext.Provider>
  )
}
