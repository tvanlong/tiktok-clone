import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import ListAccount from '~/components/ListAccount'
import { getSuggestedUsers } from '~/apis/suggestedUsers.api'
import SidebarLoader from '~/contents/SidebarLoader'

const INIT_PAGE = 1
const PER_PAGE = 20

function SuggestedUsers() {
  const [suggestedUsers, setSuggestedUsers] = useState([])
  const [isSeeAllSuggested, setIsSeeAllSuggested] = useState(false)
  const { data: suggestedUsersData, isLoading } = useQuery({
    queryKey: ['suggestedUsers'],
    queryFn: () => getSuggestedUsers(INIT_PAGE, PER_PAGE)
  })

  useEffect(() => {
    if (suggestedUsersData) {
      setSuggestedUsers(suggestedUsersData.data.data)
    }
  }, [suggestedUsersData])

  const handleSuggestedViewChange = () => {
    setIsSeeAllSuggested(!isSeeAllSuggested)
  }

  if (isLoading) return <SidebarLoader />

  return (
    <ListAccount
      label='Suggested accounts'
      userData={suggestedUsers}
      onViewChange={handleSuggestedViewChange}
      isSeeAll={isSeeAllSuggested}
    />
  )
}

export default SuggestedUsers
