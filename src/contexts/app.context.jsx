import { useState, createContext } from 'react'

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [isAuthenticatend, setIsAuthenticatend] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const toggleModal = () => setShowModal(!showModal)

  return (
    <AppContext.Provider value={{ isAuthenticatend, setIsAuthenticatend, showModal, toggleModal }}>
      {children}
    </AppContext.Provider>
  )
}
