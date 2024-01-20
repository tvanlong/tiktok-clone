import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import ListAccount from '~/components/ListAccount'
import { getSuggestedUsers } from '~/apis/suggestedUsers.api'
import SidebarLoader from '~/contents/SidebarLoader'
import { useTranslation } from 'react-i18next'

const INIT_PAGE = Math.floor(Math.random() * 10) + 1
const PER_PAGE = 10

function SuggestedUsers() {
  const { t } = useTranslation(['sidebar'])
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
      label={t('Suggested accounts')}
      userData={suggestedUsers}
      onViewChange={handleSuggestedViewChange}
      isSeeAll={isSeeAllSuggested}
    />
  )
}

export default SuggestedUsers
