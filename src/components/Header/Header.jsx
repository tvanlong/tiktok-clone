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
                  <svg
                    width='28'
                    data-e2e=''
                    height='28'
                    fill='currentColor'
                    viewBox='0 0 48 48'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M34.68 6H13.32c-1.05 0-1.96 0-2.71.06-.8.07-1.58.2-2.33.6a6 6 0 0 0-2.63 2.62 6.1 6.1 0 0 0-.59 2.33C5 12.36 5 13.27 5 14.32V36H0v1a3 3 0 0 0 3 3h21v-6H9V14.4c0-1.15 0-1.9.05-2.46.04-.55.12-.75.17-.85a2 2 0 0 1 .87-.87c.1-.05.3-.13.85-.17A34 34 0 0 1 13.4 10h29.24a6 6 0 0 0-2.92-3.35 6.1 6.1 0 0 0-2.33-.59C36.64 6 35.73 6 34.68 6Z'></path>
                    <path d='M48 18a6 6 0 0 0-6-6h-8a6 6 0 0 0-6 6v20a6 6 0 0 0 6 6h8a6 6 0 0 0 6-6V18Zm-16 0c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v20a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2V18Z'></path>
                  </svg>
                </button>
              </Tippy>
              <TippyDefault content='Messages' placement='bottom'>
                <button className={cx('messages-btn')}>
                  <svg
                    width='1em'
                    data-e2e=''
                    height='1em'
                    viewBox='0 0 48 48'
                    fill='currentColor'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fill-rule='evenodd'
                      clip-rule='evenodd'
                      d='M2.17877 7.17357C2.50304 6.45894 3.21528 6 4.00003 6H44C44.713 6 45.372 6.37952 45.7299 6.99615C46.0877 7.61278 46.0902 8.37327 45.7365 8.99228L25.7365 43.9923C25.3423 44.6821 24.5772 45.0732 23.7872 44.9886C22.9972 44.9041 22.3321 44.3599 22.0929 43.6023L16.219 25.0017L2.49488 9.31701C1.97811 8.72642 1.85449 7.88819 2.17877 7.17357ZM20.377 24.8856L24.531 38.0397L40.5537 10H8.40757L18.3918 21.4106L30.1002 14.2054C30.5705 13.9159 31.1865 14.0626 31.4759 14.533L32.5241 16.2363C32.8136 16.7066 32.6669 17.3226 32.1966 17.612L20.377 24.8856Z'
                    ></path>
                  </svg>
                </button>
              </TippyDefault>
              <TippyDefault content='Inbox' placement='bottom'>
                <button className={cx('inbox-btn')}>
                  <svg
                    width='32'
                    data-e2e=''
                    height='32'
                    viewBox='0 0 32 32'
                    fill='currentColor'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fill-rule='evenodd'
                      clip-rule='evenodd'
                      d='M24.0362 21.3333H18.5243L15.9983 24.4208L13.4721 21.3333H7.96047L7.99557 8H24.0009L24.0362 21.3333ZM24.3705 23.3333H19.4721L17.2883 26.0026C16.6215 26.8176 15.3753 26.8176 14.7084 26.0026L12.5243 23.3333H7.62626C6.70407 23.3333 5.95717 22.5845 5.9596 21.6623L5.99646 7.66228C5.99887 6.74352 6.74435 6 7.66312 6H24.3333C25.2521 6 25.9975 6.7435 26 7.66224L26.0371 21.6622C26.0396 22.5844 25.2927 23.3333 24.3705 23.3333ZM12.6647 14C12.2965 14 11.998 14.2985 11.998 14.6667V15.3333C11.998 15.7015 12.2965 16 12.6647 16H19.3313C19.6995 16 19.998 15.7015 19.998 15.3333V14.6667C19.998 14.2985 19.6995 14 19.3313 14H12.6647Z'
                    ></path>
                  </svg>
                </button>
              </TippyDefault>
              <Menu items={userMenu}>
                <img
                  className={cx('avatar')}
                  src='https://img6.thuthuatphanmem.vn/uploads/2022/11/18/anh-avatar-don-gian-ma-dep_081757969.jpg'
                  alt=''
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
                  <svg
                    width='28'
                    data-e2e=''
                    height='28'
                    fill='currentColor'
                    viewBox='0 0 48 48'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M34.68 6H13.32c-1.05 0-1.96 0-2.71.06-.8.07-1.58.2-2.33.6a6 6 0 0 0-2.63 2.62 6.1 6.1 0 0 0-.59 2.33C5 12.36 5 13.27 5 14.32V36H0v1a3 3 0 0 0 3 3h21v-6H9V14.4c0-1.15 0-1.9.05-2.46.04-.55.12-.75.17-.85a2 2 0 0 1 .87-.87c.1-.05.3-.13.85-.17A34 34 0 0 1 13.4 10h29.24a6 6 0 0 0-2.92-3.35 6.1 6.1 0 0 0-2.33-.59C36.64 6 35.73 6 34.68 6Z'></path>
                    <path d='M48 18a6 6 0 0 0-6-6h-8a6 6 0 0 0-6 6v20a6 6 0 0 0 6 6h8a6 6 0 0 0 6-6V18Zm-16 0c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v20a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2V18Z'></path>
                  </svg>
                </button>
              </Tippy>
              <Menu items={MENU_ITEMS}>
                <button className={cx('more-btn')}>
                  <svg
                    width='1em'
                    data-e2e=''
                    height='1em'
                    viewBox='0 0 48 48'
                    fill='currentColor'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fill-rule='evenodd'
                      clip-rule='evenodd'
                      d='M24 4C26.2091 4 28 5.79086 28 8C28 10.2091 26.2091 12 24 12C21.7909 12 20 10.2091 20 8C20 5.79086 21.7909 4 24 4ZM24 20C26.2091 20 28 21.7909 28 24C28 26.2091 26.2091 28 24 28C21.7909 28 20 26.2091 20 24C20 21.7909 21.7909 20 24 20ZM24 36C26.2091 36 28 37.7909 28 40C28 42.2091 26.2091 44 24 44C21.7909 44 20 42.2091 20 40C20 37.7909 21.7909 36 24 36Z'
                    ></path>
                  </svg>
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
