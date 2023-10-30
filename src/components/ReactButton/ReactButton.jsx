import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames/bind'
import styles from './ReactButton.module.scss'

const cx = classNames.bind(styles)

function ReactButton({ icon, count }) {
  return (
    <div className={cx('btn-wrapper')}>
      <button className={cx('custom-button')}>
        <FontAwesomeIcon className={cx('react-icon')} icon={icon} />
      </button>
      <div className={cx('amount')}>{count}</div>
    </div>
  )
}

export default ReactButton
