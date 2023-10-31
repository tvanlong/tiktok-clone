import { useContext } from 'react'
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
import { AppContext } from '~/contexts/app.context'
import Button from '~/components/Button'
import SuggestedUsers from './SuggestedUsers'
import FollowingUsers from './FollowingUsers'

const cx = classNames.bind(styles)

function Sidebar() {
  const { isAuthenticated, toggleModal } = useContext(AppContext)

  return (
    <aside className={cx('wrapper')}>
      <Menu>
        <MenuItem title='For You' to={path.home} icon={<HomeIcon />} activeIcon={<HomeActiveIcon />} />
        <MenuItem title='Following' to={path.following} icon={<UserGroupIcon />} activeIcon={<UserGroupActiveIcon />} />
        <MenuItem title='Explore' to={path.explore} icon={<ExploreIcon />} activeIcon={<ExploreActiveIcon />} />
        <MenuItem title='LIVE' to={path.live} icon={<LiveIcon />} activeIcon={<LiveActiveIcon />} />
      </Menu>

      {isAuthenticated && (
        <>
          <SuggestedUsers />
          <FollowingUsers />
        </>
      )}

      {!isAuthenticated && (
        <div className={cx('wrapper-login')}>
          <p>Log in to follow creators, like videos, and view comments.</p>
          <Button large primary className={cx('custom-login')} onClick={toggleModal}>
            Log in
          </Button>
        </div>
      )}
    </aside>
  )
}

export default Sidebar
