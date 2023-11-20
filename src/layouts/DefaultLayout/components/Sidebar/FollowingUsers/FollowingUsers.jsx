import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import ListAccount from '~/components/ListAccount'
import { getFollowingList } from '~/apis/followingList.api'
import SidebarLoader from '~/contents/SidebarLoader'

const INIT_PAGE = 1

function FollowingUsers() {
  const [followingUsers, setFollowingUsers] = useState([])
  const [isSeeAllFollowing, setIsSeeAllFollowing] = useState(false)
  const { data: followingUsersData, isLoading } = useQuery({
    queryKey: ['followingUsers'],
    queryFn: () => getFollowingList(INIT_PAGE)
  })

  useEffect(() => {
    if (followingUsersData) {
      setFollowingUsers(followingUsersData.data.data)
    }
  }, [followingUsersData])

  const handleFollowingViewChange = () => {
    setIsSeeAllFollowing(!isSeeAllFollowing)
  }

  if (isLoading) return <SidebarLoader />

  return (
    <ListAccount
      label='Recently following accounts'
      userData={followingUsers}
      onViewChange={handleFollowingViewChange}
      isSeeAll={isSeeAllFollowing}
    />
  )
}

export default FollowingUsers
