import PropTypes from 'prop-types'
import Image from '~/components/Image'
import Wrapper from '~/components/Wrapper'
import AccountPreview from '~/components/ListAccount/AccountPreview'
import Tippy from '@tippyjs/react/headless'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import styles from './AccountItem.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

function AccountItem({ user }) {
  const renderPreview = (props) => {
    return (
      <div tabIndex='-1' {...props}>
        <Wrapper>
          <AccountPreview key={user.id} user={user} />
        </Wrapper>
      </div>
    )
  }
  return (
    <div>
      <Tippy interactive delay={[800, 0]} offset={[0, -20]} placement='right' render={renderPreview}>
        <div className={cx('account-item')}>
          <Image className={cx('avatar')} src={user.avatar} alt={user.nickname} />
          <div className={cx('item-info')}>
            <p className={cx('nickname')}>
              <strong>{user.nickname}</strong>
              <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
            </p>
            <p className={cx('name')}>
              {user.first_name} {user.last_name}
            </p>
          </div>
        </div>
      </Tippy>
    </div>
  )
}

AccountItem.propTypes = {
  user: PropTypes.object.isRequired
}

export default AccountItem