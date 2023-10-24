import PropTypes from 'prop-types'
import AccountItem from './AccountItem'

import styles from './ListAccount.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

function ListAcount({ label, data = [], onViewChange, isSeeAll }) {
  return (
    <div className={cx('wrapper')}>
      <p className={cx('label')}>{label}</p>
      {data.map((user) => (
        <AccountItem key={user.id} user={user} />
      ))}
      <p className={cx('more-btn')} onClick={onViewChange}>
        {isSeeAll ? 'See less' : 'See all'}
      </p>
    </div>
  )
}

ListAcount.propTypes = {
  label: PropTypes.string.isRequired,
  data: PropTypes.array,
  onViewChange: PropTypes.func.isRequired
}

export default ListAcount
