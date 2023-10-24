import PropTypes from 'prop-types'
import Button from '~/components/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import styles from './AccountPreview.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

function AccountPreview({ user }) {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('header')}>
        <img className={cx('avatar')} src={user.avatar} alt={user.nickname} />
        <Button className={cx('follow-btn')} primary>
          Follow
        </Button>
      </div>
      <div className={cx('body')}>
        <p className={cx('nickname')}>
          <strong>{user.nickname}</strong>
          <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
        </p>
        <p className={cx('name')}>
          {user.first_name} {user.last_name}
        </p>
        <p className={cx('analytics')}>
          <strong className={cx('value')}>{user.followers_count}M </strong>
          <span className={cx('label')}>Followers</span>
          <strong className={cx('value')}>{user.likes_count}M </strong>
          <span className={cx('label')}>Likes</span>
        </p>
      </div>
    </div>
  )
}

AccountPreview.propTypes = {
  user: PropTypes.object.isRequired
}

export default AccountPreview
