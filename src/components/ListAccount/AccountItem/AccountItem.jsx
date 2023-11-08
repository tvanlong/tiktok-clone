import PropTypes from 'prop-types'
import Image from '~/components/Image'
import Wrapper from '~/components/Wrapper'
import AccountPreview from '~/components/ListAccount/AccountPreview'
import Tippy from '@tippyjs/react/headless'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import styles from './AccountItem.module.scss'
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { getProfile } from '~/apis/auth.api'

const cx = classNames.bind(styles)

function AccountItem({ user }) {
  const queryClient = useQueryClient()
  const handlePrefetchingUser = (nickname) => {
    queryClient.prefetchQuery({
      queryKey: ['user', nickname],
      queryFn: () => getProfile(nickname),
      staleTime: 1000 * 10 // Kiểm tra cache sau 10s khi hover vào account item
    })
  }

  const renderPreview = (props) => {
    return (
      <div tabIndex='-1' {...props}>
        <Wrapper>
          <AccountPreview key={user.id} user={user} />
        </Wrapper>
      </div>
    )
  }

  if (user.is_followed) {
    return (
      <Link
        to={`/@${user.nickname}`}
        className={cx('account-item')}
        onMouseEnter={() => handlePrefetchingUser(`@${user.nickname}`)}
      >
        <Image className={cx('avatar')} src={user.avatar} alt={user.nickname} />
        <div className={cx('item-info')}>
          <p className={cx('nickname')}>
            <strong>{user.nickname}</strong>
            {user.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
          </p>
          <p className={cx('name')}>
            {user.first_name} {user.last_name}
          </p>
        </div>
      </Link>
    )
  } else {
    return (
      <div>
        <Tippy interactive delay={[800, 0]} offset={[0, -20]} placement='right' render={renderPreview}>
          <Link
            to={`/@${user.nickname}`}
            className={cx('account-item')}
            onMouseEnter={() => handlePrefetchingUser(`@${user.nickname}`)}
          >
            <Image className={cx('avatar')} src={user.avatar} alt={user.nickname} />
            <div className={cx('item-info')}>
              <p className={cx('nickname')}>
                <strong>{user.nickname}</strong>
                {user.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
              </p>
              <p className={cx('name')}>
                {user.first_name} {user.last_name}
              </p>
            </div>
          </Link>
        </Tippy>
      </div>
    )
  }
}

AccountItem.propTypes = {
  user: PropTypes.object.isRequired
}

export default AccountItem
