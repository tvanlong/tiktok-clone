import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import ListAcount from '~/components/ListAccount'
import { getFollowingList } from '~/apis/followingList.api'

const INIT_PAGE = 1

function FollowingUsers() {
  const [followingUsers, setFollowingUsers] = useState([])
  const [isSeeAllFollowing, setIsSeeAllFollowing] = useState(false)
  const { data: followingUsersData } = useQuery({
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

  return (
    <ListAcount
      label='Following accounts'
      userData={followingUsers}
      onViewChange={handleFollowingViewChange}
      isSeeAll={isSeeAllFollowing}
    />
  )
}

export default FollowingUsers
