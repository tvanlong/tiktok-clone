import { useContext } from 'react'
import { AppContext } from '~/contexts/app.context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faLaptop, faBars } from '@fortawesome/free-solid-svg-icons'
import Tippy from '@tippyjs/react/headless'
import TippyDefault from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import images from '~/assets/images'
import Wrapper from '~/components/Wrapper'
import Button from '~/components/Button'
import Menu from '~/components/Menu'
import {
  DesktopApp,
  ExploreIcon,
  HomeIcon,
  InboxIcon,
  LiveIcon,
  MessageIcon,
  MoreIcon,
  UserGroupIcon
} from '~/constants/icons'
import Image from '~/components/Image'
import Search from './Search'
import { Link, NavLink } from 'react-router-dom'
import path from '~/constants/path'
import { menuItems, userMenu } from '~/constants/menu'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames/bind'
import styles from './Header.module.scss'

const cx = classNames.bind(styles)

function Header() {
  const { toggleModal, isAuthenticated, setIsAuthenticated, profile } = useContext(AppContext)
  const { t } = useTranslation(['header'])

  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner')}>
        {/* Mobile Navbar */}
        <label htmlFor='nav-mobile-input' className={cx('navbar-menu')}>
          <FontAwesomeIcon icon={faBars} />
        </label>
        <input className={cx('check')} id='nav-mobile-input' type='checkbox' />
        <label className={cx('nav-overlay')} htmlFor='nav-mobile-input'></label>
        <div className={cx('navbar-menu-mobile')}>
          <NavLink className={({ isActive }) => cx('menu-item', { active: isActive })} to={path.home}>
            <span className={cx('icon')}>
              <HomeIcon />
            </span>
            <span className={cx('title')}>For You</span>
          </NavLink>
          <NavLink className={({ isActive }) => cx('menu-item', { active: isActive })} to={path.following}>
            <span className={cx('icon')}>
              <UserGroupIcon />
            </span>
            <span className={cx('title')}>Following</span>
          </NavLink>
          <NavLink className={({ isActive }) => cx('menu-item', { active: isActive })} to={path.explore}>
            <span className={cx('icon')}>
              <ExploreIcon />
            </span>
            <span className={cx('title')}>Explore</span>
          </NavLink>
          <NavLink className={({ isActive }) => cx('menu-item', { active: isActive })} to={path.live}>
            <span className={cx('icon')}>
              <LiveIcon />
            </span>
            <span className={cx('title')}>Live</span>
          </NavLink>
        </div>
        {/* End Mobile Navbar */}
        <Link className={cx('logo')} to={path.home}>
          <img src={images.logo} alt='Tiktok' />
        </Link>
        <Search />
        {isAuthenticated ? (
          <>
            <div className={cx('actions')}>
              <Button to={path.upload} className={cx('btn-upload-hover')} icon={<FontAwesomeIcon icon={faPlus} />}>
                {t('Upload')}
              </Button>
              <div>
                <Tippy
                  placement='bottom'
                  interactive={true}
                  render={(attrs) => (
                    <div className={cx('download')} tabIndex='-1' {...attrs}>
                      <Wrapper>
                        <div className={cx('download-content')}>
                          <FontAwesomeIcon size='6x' icon={faLaptop} />
                          <p>{t('TikTok Desktop App')}</p>
                          <Button primary large>
                            {t('Download')}
                          </Button>
                        </div>
                      </Wrapper>
                    </div>
                  )}
                >
                  <button className={cx('app-btn')}>
                    <DesktopApp />
                  </button>
                </Tippy>
              </div>
              <TippyDefault delay={[0, 50]} content='Messages' placement='bottom'>
                <button className={cx('messages-btn')}>
                  <MessageIcon />
                </button>
              </TippyDefault>
              <TippyDefault delay={[0, 50]} content='Inbox' placement='bottom'>
                <button className={cx('inbox-btn')}>
                  <InboxIcon />
                  <span className={cx('badge')}>3</span>
                </button>
              </TippyDefault>
              <Menu items={userMenu} setIsAuthenticated={setIsAuthenticated}>
                <Image
                  className={cx('avatar')}
                  src={
                    profile?.avatar !== 'https://files.fullstack.edu.vn/f8-tiktok/'
                      ? profile?.avatar
                      : 'https://i.pinimg.com/736x/9a/63/e1/9a63e148aaff53532b045f6d1f09d762.jpg'
                  }
                  alt={profile?.name || ''}
                />
              </Menu>
            </div>
          </>
        ) : (
          <>
            <div className={cx('actions')}>
              <Button className={cx('btn-upload-hover')} icon={<FontAwesomeIcon icon={faPlus} />}>
                {t('Upload')}
              </Button>
              <Button primary onClick={toggleModal}>
                {t('Log in')}
              </Button>
              <div>
                <Tippy
                  placement='bottom'
                  interactive={true}
                  render={(attrs) => (
                    <div className={cx('download')} tabIndex='-1' {...attrs}>
                      <Wrapper>
                        <div className={cx('download-content')}>
                          <FontAwesomeIcon size='6x' icon={faLaptop} />
                          <p>{t('TikTok Desktop App')}</p>
                          <Button primary large>
                            {t('Download')}
                          </Button>
                        </div>
                      </Wrapper>
                    </div>
                  )}
                >
                  <button className={cx('app-btn')}>
                    <DesktopApp />
                  </button>
                </Tippy>
              </div>
              <Menu items={menuItems}>
                <button className={cx('more-btn')}>
                  <MoreIcon />
                </button>
              </Menu>
            </div>
          </>
        )}
      </div>
    </header>
  )
}

export default Header
