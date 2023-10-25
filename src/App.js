import { useState } from 'react'
import useRouteElements from './useRouteElements'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ModalRegister from '~/components/ModalRegister'
import ModalLogin from '~/components/ModalLogin'

function App() {
  const routeElements = useRouteElements()
  const [isLogin, setIsLogin] = useState(true)
  const handleSwitchModal = () => {
    setIsLogin(!isLogin)
  }
  return (
    <div className='App'>
      {routeElements}
      {isLogin ? (
        <ModalLogin handleSwitchModal={handleSwitchModal} />
      ) : (
        <ModalRegister handleSwitchModal={handleSwitchModal} />
      )}
      <ToastContainer />
    </div>
  )
}

export default App
