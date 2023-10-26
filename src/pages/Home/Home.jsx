import { Link } from 'react-router-dom'
import Image from '~/components/Image'
import Button from '~/components/Button'
import classNames from 'classnames/bind'
import styles from './Home.module.scss'

const cx = classNames.bind(styles)

function Home() {
  return (
    <div className={cx('container')}>
      <div className={cx('wrapper')}>
        <div className={cx('list-item-container')}>
          <Link to=''>
            <Image
              className={cx('avatar')}
              src='https://i.pinimg.com/originals/2b/0f/7a/2b0f7a9533237b7e9b49f62ba73b95dc.jpg'
              alt=''
            />
          </Link>
          <div className={cx('content-container')}>
            <div className={cx('text-info')}>
              <Link to='' className={cx('nickname')}>
                nam.perdz
              </Link>
              <span className={cx('username')}>Nam Per fect</span>
              <p className={cx('caption')}>
                Đặc sản mùa hè #namper #flygentertainment #gcent #namperluxury #hobebar #lankhumui @KTS. Quốc Chính
              </p>
              <Button primary className={cx('custom-follow')}>
                Follow
              </Button>
            </div>
            <div className={cx('video')}>
              <video controls autoPlay>
                <source
                  src='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
                  type='video/mp4'
                />
              </video>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
