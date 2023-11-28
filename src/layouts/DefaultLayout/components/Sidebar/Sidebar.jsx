import { useContext } from 'react'
import path from '~/constants/path'
import Menu from './Menu'
import MenuItem from './MenuItem'
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
import { useTranslation } from 'react-i18next'
import styles from './Sidebar.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

function Sidebar() {
  const { isAuthenticated, toggleModal } = useContext(AppContext)
  const { t } = useTranslation(['sidebar'])

  return (
    <aside className={cx('wrapper')}>
      <Menu>
        <MenuItem title={t('For You')} to={path.home} icon={<HomeIcon />} activeIcon={<HomeActiveIcon />} />
        <MenuItem
          title={t('Following')}
          to={path.following}
          icon={<UserGroupIcon />}
          activeIcon={<UserGroupActiveIcon />}
        />
        <MenuItem title={t('Explore')} to={path.explore} icon={<ExploreIcon />} activeIcon={<ExploreActiveIcon />} />
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
          <p>{t('Log in to follow creators, like videos, and view comments.')}</p>
          <Button large primary className={cx('custom-login')} onClick={toggleModal}>
            {t('Log in')}
          </Button>
        </div>
      )}
    </aside>
  )
}

export default Sidebar
