import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getSuggestedUsers } from '~/apis/suggestedUsers.api'
import path from '~/constants/path'
import Menu from './Menu'
import MenuItem from './MenuItem'
import styles from './Sidebar.module.scss'
import classNames from 'classnames/bind'
import {
  ExploreIcon,
  HomeIcon,
  LiveIcon,
  UserGroupIcon,
  HomeActiveIcon,
  ExploreActiveIcon,
  LiveActiveIcon,
  UserGroupActiveIcon
} from '~/constants/icons'
import ListAcount from '~/components/ListAccount'

const cx = classNames.bind(styles)

const INIT_PAGE = 1
const PER_PAGE = 20

function Sidebar() {
  const [suggestedUsers, setSuggestedUsers] = useState([])
  const [isSeeAll, setIsSeeAll] = useState(false)
  const { data } = useQuery({
    queryKey: ['suggestedUsers'],
    queryFn: () => getSuggestedUsers(INIT_PAGE, PER_PAGE)
  })

  useEffect(() => {
    if (data) {
      setSuggestedUsers(data.data.data)
    }
  }, [data])

  const handleViewChange = () => {
    if (isSeeAll) {
      setIsSeeAll(false)
    } else {
      setIsSeeAll(true)
    }
  }

  return (
    <aside className={cx('wrapper')}>
      <Menu>
        <MenuItem title='For You' to={path.home} icon={<HomeIcon />} activeIcon={<HomeActiveIcon />} />
        <MenuItem title='Following' to={path.following} icon={<UserGroupIcon />} activeIcon={<UserGroupActiveIcon />} />
        <MenuItem title='Explore' to={path.explore} icon={<ExploreIcon />} activeIcon={<ExploreActiveIcon />} />
        <MenuItem title='LIVE' to={path.live} icon={<LiveIcon />} activeIcon={<LiveActiveIcon />} />
      </Menu>

      <ListAcount
        label='Suggested accounts'
        data={suggestedUsers}
        onViewChange={handleViewChange}
        isSeeAll={isSeeAll}
      />
      {/* <ListAcount label='Following accounts' /> */}
    </aside>
  )
}

export default Sidebar
