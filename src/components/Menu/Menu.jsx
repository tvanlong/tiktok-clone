import { useState } from 'react'
import Tippy from '@tippyjs/react/headless'
import 'tippy.js/dist/tippy.css'
import Wrapper from '~/components/Wrapper'
import classNames from 'classnames/bind'
import styles from './Menu.module.scss'
import Button from '~/components/Button'
import Header from './Header'

const cx = classNames.bind(styles)

function Menu({ children, items = [] }) {
  const [history, setHistory] = useState([{ data: items }])
  const current = history[history.length - 1]

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

  const renderItems = () => {
    return current.data.map((item, index) => {
      return (
        <Button
          key={index}
          className={cx('menu-item', { separate: item.separate })}
          icon={item.icon}
          to={item.to}
          onClick={() => handleNext(item)}
        >
          {item.title}
        </Button>
      )
    })
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
