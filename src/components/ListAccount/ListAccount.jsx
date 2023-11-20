import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import AccountItem from './AccountItem'
import styles from './ListAccount.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

function ListAccount({ label, userData = [], onViewChange, isSeeAll }) {
  const [visibleUserData, setVisibleUserData] = useState([])

  useEffect(() => {
    if (isSeeAll) {
      setVisibleUserData(userData)
    } else {
      setVisibleUserData(userData.slice(0, 5))
    }
  }, [isSeeAll, userData])

  return (
    <div className={cx('wrapper')}>
      <p className={cx('label')}>{label}</p>
      {visibleUserData.map((user) => (
        <AccountItem key={user.id} user={user} />
      ))}
      {userData.length > 5 && (
        <p className={cx('more-btn')} onClick={onViewChange}>
          {isSeeAll ? 'See less' : 'See all'}
        </p>
      )}
    </div>
  )
}

ListAccount.propTypes = {
  label: PropTypes.string.isRequired,
  userData: PropTypes.array.isRequired,
  onViewChange: PropTypes.func.isRequired,
  isSeeAll: PropTypes.bool.isRequired
}

export default ListAccount
