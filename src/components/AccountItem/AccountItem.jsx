import classNames from 'classnames/bind'
import styles from './AccountItem.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'

const cx = classNames.bind(styles)

function AccountItem() {
  return (
    <div className={cx('wrapper')}>
      <img
        className={cx('avatar')}
        src='https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/a5adc55a2c02da00aafcac7684919336~c5_100x100.jpeg?x-expires=1697720400&x-signature=dEAJ8D%2BhXEoqzNk7Mb%2FDnGIKE%2Fg%3D'
        alt=''
      />
      <div className={cx('info')}>
        <h4 className={cx('name')}>
          <span>Nguyen Van A</span>
          <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
        </h4>
        <span className={cx('username')}>nguyenvana</span>
      </div>
    </div>
  )
}

export default AccountItem
