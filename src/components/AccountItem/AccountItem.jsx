import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'
import styles from './AccountItem.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'

const cx = classNames.bind(styles)

function AccountItem({ data }) {
  return (
    <Link to={`/@${data.nickname}`} className={cx('wrapper')}>
      <img className={cx('avatar')} src={data.avatar} alt={data.full_name} />
      <div className={cx('info')}>
        <h4 className={cx('name')}>
          <span>{data.full_name}</span>
          {data.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
        </h4>
        <span className={cx('username')}>{data.nickname}</span>
      </div>
    </Link>
  )
}

AccountItem.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    full_name: PropTypes.string,
    nickname: PropTypes.string,
    avatar: PropTypes.string,
    tick: PropTypes.bool
  })
}

export default AccountItem
