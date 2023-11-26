import { PulseLoader } from 'react-spinners'
import { Helmet } from 'react-helmet'
import classNames from 'classnames/bind'
import styles from './Live.module.scss'

const cx = classNames.bind(styles)

function Live() {
  return (
    <div className={cx('container')}>
      <Helmet>
        <title>(5)TikTok LIVE | TikTok</title>
        <meta name='description' content='(5)TikTok LIVE | TikTok' />
      </Helmet>
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

export default Live
