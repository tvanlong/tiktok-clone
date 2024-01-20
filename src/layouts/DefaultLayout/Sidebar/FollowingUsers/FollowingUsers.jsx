import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import ListAccount from '~/components/ListAccount'
import { getFollowingList } from '~/apis/followingList.api'
import SidebarLoader from '~/contents/SidebarLoader'
import { useTranslation } from 'react-i18next'

const INIT_PAGE = 1

function FollowingUsers() {
  const { t } = useTranslation(['sidebar'])
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
      label={t('Recently following accounts')}
      userData={followingUsers}
      onViewChange={handleFollowingViewChange}
      isSeeAll={isSeeAllFollowing}
    />
  )
}

export default FollowingUsers
