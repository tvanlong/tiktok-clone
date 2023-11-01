import PropTypes from 'prop-types'
import Header from '~/components/Header'
import classNames from 'classnames/bind'
import styles from './OnlyHeaderLayout.module.scss'

const cx = classNames.bind(styles)

function OnlyHeaderLayout({ children }) {
  return (
    <div>
      <Header />
      <div className={cx('container')}>
        <div className={cx('content')}>{children}</div>
      </div>
    </div>
  )
}

OnlyHeaderLayout.propTypes = {
  children: PropTypes.node.isRequired
}

export default OnlyHeaderLayout
