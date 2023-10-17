import { useRoutes } from 'react-router-dom'
import Home from '~/pages/Home'
import Following from '~/pages/Following'
import Explore from '~/pages/Explore'
import Live from '~/pages/Live'
import Upload from '~/pages/Upload'
import Profile from '~/pages/Profile'
import Search from '~/pages/Search'
import DefaultLayout from '~/layouts/DefaultLayout'
import OnlyHeaderLayout from '~/layouts/OnlyHeaderLayout'

function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '/',
      element: (
        <DefaultLayout>
          <Home />
        </DefaultLayout>
      )
    },
    {
      path: '/following',
      element: (
        <DefaultLayout>
          <Following />
        </DefaultLayout>
      )
    },
    {
      path: '/explore',
      element: (
        <DefaultLayout>
          <Explore />
        </DefaultLayout>
      )
    },
    {
      path: '/live',
      element: (
        <DefaultLayout>
          <Live />
        </DefaultLayout>
      )
    },
    {
      path: '/profile',
      element: (
        <DefaultLayout>
          <Profile />
        </DefaultLayout>
      )
    },
    {
      path: '/search',
      element: (
        <DefaultLayout>
          <Search />
        </DefaultLayout>
      )
    },
    {
      path: '/upload',
      element: (
        <OnlyHeaderLayout>
          <Upload />
        </OnlyHeaderLayout>
      )
    }
  ])

  return routeElements
}

export default useRouteElements
