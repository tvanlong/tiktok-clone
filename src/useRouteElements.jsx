import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import Home from '~/pages/Home'
import Following from '~/pages/Following'
import Explore from '~/pages/Explore'
import Live from '~/pages/Live'
import Upload from '~/pages/Upload'
import Profile from '~/pages/Profile'
import Search from '~/pages/Search'
import DefaultLayout from '~/layouts/DefaultLayout'
import OnlyHeaderLayout from '~/layouts/OnlyHeaderLayout'
import { useContext } from 'react'
import { AppContext } from '~/contexts/app.context'
import { toast } from 'react-toastify'
import path from '~/constants/path'

function ProtectedRoute() {
  // Nếu đã login (isAuthenticated là true) thì mới cho phép đi tiếp
  // Ngược lại thì redirect về trang chủ
  const { isAuthenticated } = useContext(AppContext)
  if (isAuthenticated) {
    return <Outlet />
  } else {
    toast.warning('You must login to continue', {
      autoClose: 2000,
      position: 'top-center',
      pauseOnHover: false
    })
    return <Navigate to='/' />
  }
}

function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: path.home,
      element: (
        <DefaultLayout>
          <Home />
        </DefaultLayout>
      )
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: path.following,
          element: (
            <DefaultLayout>
              <Following />
            </DefaultLayout>
          )
        },
        {
          path: path.explore,
          element: (
            <DefaultLayout>
              <Explore />
            </DefaultLayout>
          )
        },
        {
          path: path.upload,
          element: (
            <OnlyHeaderLayout>
              <Upload />
            </OnlyHeaderLayout>
          )
        }
      ]
    },
    {
      path: path.nickname,
      element: (
        <DefaultLayout>
          <Profile />
        </DefaultLayout>
      )
    },
    {
      path: path.live,
      element: (
        <DefaultLayout>
          <Live />
        </DefaultLayout>
      )
    },
    {
      path: path.search,
      element: (
        <DefaultLayout>
          <Search />
        </DefaultLayout>
      )
    }
  ])

  return routeElements
}

export default useRouteElements
