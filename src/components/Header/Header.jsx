import { useContext } from 'react'
import { AppContext } from '~/contexts/app.context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faLaptop } from '@fortawesome/free-solid-svg-icons'
import Tippy from '@tippyjs/react/headless'
import TippyDefault from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import images from '~/assets/images'
import Wrapper from '~/components/Wrapper'
import Button from '~/components/Button'
import Menu from '~/components/Menu'
import { DesktopApp, InboxIcon, MessageIcon, MoreIcon } from '~/constants/icons'
import Image from '~/components/Image'
import Search from './components/Search'
import classNames from 'classnames/bind'
import styles from './Header.module.scss'
import { Link } from 'react-router-dom'
import path from '~/constants/path'
import { menuItems, userMenu } from '~/constants/menu'

const cx = classNames.bind(styles)

function Header() {
  const { toggleModal, isAuthenticated, setIsAuthenticated } = useContext(AppContext)

  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner')}>
        <Link to={path.home}>
          <img src={images.logo} alt='Tiktok' />
        </Link>
        <Search />
        {isAuthenticated ? (
          <>
            <div className={cx('actions')}>
              <Button className={cx('btn-upload-hover')} icon={<FontAwesomeIcon icon={faPlus} />}>
                Upload
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
              <Button primary onClick={toggleModal}>
                Log in
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
