import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faLightbulb,
  faEarthAmericas,
  faCircleQuestion,
  faKeyboard,
  faMoon,
  faUser,
  faBookmark,
  faCoins,
  faGear,
  faSignOut,
  faPlus,
  faSpinner,
  faMagnifyingGlass,
  faCircleXmark,
  faLaptop
} from '@fortawesome/free-solid-svg-icons'
import Tippy from '@tippyjs/react/headless'
import TippyDefault from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import images from '~/assets/images'
import Wrapper from '~/components/Wrapper'
import AccountItem from '~/components/AccountItem'
import Button from '~/components/Button'
import classNames from 'classnames/bind'
import styles from './Header.module.scss'
import Menu from '~/components/Menu'
import { DesktopApp, InboxIcon, MessageIcon, MoreIcon } from '~/constants/icons'
import Image from '~/components/Image'

const cx = classNames.bind(styles)

const MENU_ITEMS = [
  {
    icon: <FontAwesomeIcon icon={faLightbulb} />,
    title: 'LIVE Creator Hub'
  },
  {
    icon: <FontAwesomeIcon icon={faEarthAmericas} />,
    title: 'English',
    children: {
      title: 'Language',
      data: [
        {
          title: 'English'
        },
        {
          title: 'Vietnamese'
        }
      ]
    }
  },
  {
    icon: <FontAwesomeIcon icon={faCircleQuestion} />,
    title: 'Feedback and help'
  },
  {
    icon: <FontAwesomeIcon icon={faKeyboard} />,
    title: 'Keyboard shortcuts'
  },
  {
    icon: <FontAwesomeIcon icon={faMoon} />,
    title: 'Dark mode'
  }
]

function Header() {
  const [searchResult, setSearchResult] = useState([])

  const userMenu = [
    {
      icon: <FontAwesomeIcon icon={faUser} />,
      title: 'View profile'
    },
    {
      icon: <FontAwesomeIcon icon={faBookmark} />,
      title: 'Favorties'
    },
    {
      icon: <FontAwesomeIcon icon={faCoins} />,
      title: 'Get coins'
    },
    {
      icon: <FontAwesomeIcon icon={faGear} />,
      title: 'Settings'
    },
    ...MENU_ITEMS,
    {
      icon: <FontAwesomeIcon icon={faSignOut} />,
      title: 'Log out',
      separate: true
    }
  ]
  const user = true // Kiểm tra xem người dùng đã đăng nhập hay chưa

  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner')}>
        <img src={images.logo} alt='Tiktok' />
        <Tippy
          visible={searchResult.length > 0}
          interactive={true}
          render={(attrs) => (
            <div className={cx('search-result')} tabIndex='-1' {...attrs}>
              <Wrapper>
                <h4 className={cx('search-title')}>Accounts</h4>
                <AccountItem />
                <AccountItem />
                <AccountItem />
                <AccountItem />
              </Wrapper>
            </div>
          )}
        >
          <div className={cx('search')}>
            <input placeholder='Search' spellCheck={false} />
            <button className={cx('clear')}>
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
            <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />

            <button className={cx('search-btn')}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>
        </Tippy>
        {user ? (
          <>
            <div className={cx('actions')}>
              <Button className={cx('btn-upload-hover')} icon={<FontAwesomeIcon icon={faPlus} />}>
                Upload
              </Button>
              <Tippy
                placement='bottom'
                interactive={true}
                render={(attrs) => (
                  <div className={cx('download')} tabIndex='-1' {...attrs}>
                    <Wrapper>
                      <div className={cx('download-content')}>
                        <FontAwesomeIcon size='6x' icon={faLaptop} />
                        <p>TikTok Desktop App</p>
                        <Button primary large>
                          Download
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
              <TippyDefault content='Messages' placement='bottom'>
                <button className={cx('messages-btn')}>
                  <MessageIcon />
                </button>
              </TippyDefault>
              <TippyDefault content='Inbox' placement='bottom'>
                <button className={cx('inbox-btn')}>
                  <InboxIcon />
                </button>
              </TippyDefault>
              <Menu items={userMenu}>
                <Image
                  className={cx('avatar')}
                  src='https://img6.thuthuatphanmem.vn/uploads/2022/11/18/anh-avatar-don-gian-ma-dep_081757969.jpg'
                  alt='avatar'
                />
              </Menu>
            </div>
          </>
        ) : (
          <>
            <div className={cx('actions')}>
              <Button className={cx('btn-upload-hover')} icon={<FontAwesomeIcon icon={faPlus} />}>
                Upload
              </Button>
              <Button primary>Log in</Button>
              <Tippy
                placement='bottom'
                interactive={true}
                render={(attrs) => (
                  <div className={cx('download')} tabIndex='-1' {...attrs}>
                    <Wrapper>
                      <div className={cx('download-content')}>
                        <FontAwesomeIcon size='6x' icon={faLaptop} />
                        <p>TikTok Desktop App</p>
                        <Button primary large>
                          Download
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
              <Menu items={MENU_ITEMS}>
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
