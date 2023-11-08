import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'
import styles from './AccountItem.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { useQueryClient } from '@tanstack/react-query'
import { getProfile } from '~/apis/auth.api'

const cx = classNames.bind(styles)

function AccountItem({ data }) {
  const queryClient = useQueryClient()
  const handlePrefetchingUser = (nickname) => {
    queryClient.prefetchQuery({
      queryKey: ['user', nickname],
      queryFn: () => getProfile(nickname),
      staleTime: 1000 * 10 // Kiểm tra cache sau 10s khi hover vào account item
    })
  }
  return (
    <Link
      to={`/@${data.nickname}`}
      className={cx('wrapper')}
      onMouseEnter={() => handlePrefetchingUser(`@${data.nickname}`)}
    >
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
