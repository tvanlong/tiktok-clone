import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import ListAcount from '~/components/ListAccount'
import { getSuggestedUsers } from '~/apis/suggestedUsers.api'

const INIT_PAGE = 1
const PER_PAGE = 20

function SuggestedUsers() {
  const [suggestedUsers, setSuggestedUsers] = useState([])
  const [isSeeAllSuggested, setIsSeeAllSuggested] = useState(false)
  const { data: suggestedUsersData } = useQuery({
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

  return (
    <ListAcount
      label='Suggested accounts'
      userData={suggestedUsers}
      onViewChange={handleSuggestedViewChange}
      isSeeAll={isSeeAllSuggested}
    />
  )
}

export default SuggestedUsers
