import PropTypes from 'prop-types'
import AccountItem from './AccountItem'
import styles from './ListAccount.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

function ListAcount({ label, userData = [], onViewChange, isSeeAll }) {
  return (
    <div className={cx('wrapper')}>
      <p className={cx('label')}>{label}</p>
      {!isSeeAll ? (
        <>
          {userData.slice(0, 5).map((user) => (
            <AccountItem key={user.id} user={user} />
          ))}
        </>
      ) : (
        <>
          {userData.map((user) => (
            <AccountItem key={user.id} user={user} />
          ))}
        </>
      )}
      {userData.length > 5 && (
        <p className={cx('more-btn')} onClick={onViewChange}>
          {isSeeAll ? 'See less' : 'See all'}
        </p>
      )}
    </div>
  )
}

ListAcount.propTypes = {
  label: PropTypes.string.isRequired,
  userData: PropTypes.array,
  onViewChange: PropTypes.func.isRequired,
  isSeeAll: PropTypes.bool.isRequired
}

export default ListAcount
