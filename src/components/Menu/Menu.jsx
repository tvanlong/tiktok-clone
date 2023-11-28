import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Tippy from '@tippyjs/react/headless'
import 'tippy.js/dist/tippy.css'
import Wrapper from '~/components/Wrapper'
import Button from '~/components/Button'
import Header from './Header'
import { useMutation } from '@tanstack/react-query'
import { logoutAccount } from '~/apis/auth.api'
import { AppContext } from '~/contexts/app.context'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { getProfile } from '~/utils/auth'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames/bind'
import styles from './Menu.module.scss'

const cx = classNames.bind(styles)

function Menu({ children, items = [], setIsAuthenticated }) {
  const navigate = useNavigate()
  const { setProfile } = useContext(AppContext)
  const [history, setHistory] = useState([{ data: items }])
  const current = history[history.length - 1]
  const { i18n, t } = useTranslation(['header'])

  const logoutMutation = useMutation({
    mutationFn: logoutAccount,
    onSuccess: () => {
      setIsAuthenticated(false)
    }
  })

  const handleLogout = () => {
    logoutMutation.mutate()
    setProfile(null)
    toast.success('Đăng xuất thành công', {
      position: 'top-center',
      autoClose: 1000
    })
  }

  const handleNext = (item) => {
    if (item.children) {
      setHistory((prev) => [...prev, item.children])
    }
  }

  const handleBack = () => {
    setHistory((prev) => prev.slice(0, prev.length - 1))
  }

  const handleHideOnMouseLeave = () => {
    setHistory((prev) => prev.slice(0, 1))
  }

  const handleViewProfile = () => {
    const user = getProfile()
    navigate(`/@${user.nickname}`)
  }

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
  }

  const renderItems = () => {
    return current.data.map((item, index) => {
      return (
        <Button
          key={index}
          className={cx('menu-item', { separate: item.separate })}
          icon={item.icon}
          to={item.to}
          disabled={logoutMutation.isPending}
          {...(item.children && { onClick: () => handleNext(item) })} // Nếu có children thì onClick sẽ là handleNext
          {...(item.logout && { onClick: handleLogout })} // Nếu có logout thì onClick sẽ là setIsAuthenticated
          {...(item.profile && { onClick: handleViewProfile })} // Nếu có profile thì onClick sẽ là handleViewProfile
          {...(item.language && { onClick: () => changeLanguage(item.language) })} // Nếu có language thì onClick sẽ là changeLanguage
        >
          {t(item.title)}
        </Button>
      )
    })
  }

  if (logoutMutation.isPending) {
    return ReactDOM.createPortal(
      <div className={cx('modal')}>
        <div className={cx('overlay')}></div>
        <div className={cx('loading')}>
          <div></div>
          <div></div>
        </div>
      </div>,
      document.body
    )
  }

  return (
    <Tippy
      interactive
      hideOnClick={false}
      delay={[250, 250]}
      placement='bottom-end'
      render={(attrs) => (
        <div className={cx('menu-list')} tabIndex='-1' {...attrs}>
          <Wrapper className={cx('menu-popper')}>
            {history.length > 1 && <Header title={current.title} onBack={handleBack} />}
            <div className={cx('menu-body')}> {renderItems()}</div>
          </Wrapper>
        </div>
      )}
      onHide={handleHideOnMouseLeave}
    >
      {children}
    </Tippy>
  )
}

export default Menu
