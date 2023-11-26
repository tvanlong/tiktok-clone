import { PulseLoader } from 'react-spinners'
import { Helmet } from 'react-helmet'
import classNames from 'classnames/bind'
import styles from './Explore.module.scss'

const cx = classNames.bind(styles)

function Explore() {
  return (
    <div className={cx('container')}>
      <Helmet>
        <title>Explore - Find your favourite videos on TikTok</title>
        <meta name='description' content='Explore - Find your favourite videos on TikTok' />
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

export default Explore
