import classNames from 'classnames/bind'
import styles from '../Menu.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from 'react-i18next'

const cx = classNames.bind(styles)

function Header({ title, onBack }) {
  const { t } = useTranslation(['header'])
  return (
    <header className={cx('header')}>
      <button className={cx('back-btn')} onClick={onBack}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <h4 className={cx('header-title')}>{t(title)}</h4>
    </header>
  )
}

export default Header
