import { PulseLoader } from 'react-spinners'
import classNames from 'classnames/bind'
import styles from './Explore.module.scss'

const cx = classNames.bind(styles)

function Explore() {
  return (
    <div className={cx('container')}>
      <h3>Coming soon</h3>
      <PulseLoader
        color='#fe2c55'
        size={10}
        style={{
          display: 'block',
          marginLeft: '10px'
        }}
      />
    </div>
  )
}

export default Explore
