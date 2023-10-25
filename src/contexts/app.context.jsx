import { useState, createContext } from 'react'
import { getAccessToken } from '~/utils/auth'

export const AppContext = createContext()

const initialState = {
  isAuthenticated: Boolean(getAccessToken())
}

export const AppProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(initialState.isAuthenticated)
  const [showModal, setShowModal] = useState(false)
  const toggleModal = () => setShowModal(!showModal)

  return (
    <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated, showModal, setShowModal, toggleModal }}>
      {children}
    </AppContext.Provider>
  )
}
