import classNames from 'classnames/bind'
import styles from './Profile.module.scss'
import Image from '~/components/Image'
import Button from '~/components/Button'
import { Link, useSearchParams } from 'react-router-dom'
import { LinkIcon, PlayIcon } from '~/constants/icons'

const cx = classNames.bind(styles)

function Profile() {
  const [searchParams] = useSearchParams()
  console.log(Object.fromEntries([...searchParams]))

  return (
    <div>
      <div className={cx('container')}>
        <div className={cx('bottom-line')}>
          <div className={cx('info-wrapper')}>
            <div className={cx('user-info')}>
              <Image
                className={cx('avatar')}
                src='https://files.fullstack.edu.vn/f8-tiktok/users/5321/64283441b0f41.jpg'
                alt='nickname'
              />
              <div className={cx('user-title')}>
                <h3 className={cx('name')}>Longlong37</h3>
                <div className={cx('nickname')}>Long long</div>
                <Button className={cx('btn-follow')} primary>
                  Follow
                </Button>
              </div>
            </div>
            <div className={cx('user-subinfo')}>
              <div className={cx('count-info')}>
                <strong>1</strong>
                <span>Following</span>
              </div>
              <div className={cx('count-info')}>
                <strong>6.2M</strong>
                <span>Followers</span>
              </div>
              <div className={cx('count-info')}>
                <strong>185.5M</strong>
                <span>Likes</span>
              </div>
            </div>
            <div className={cx('desc')}>No bio yet.</div>
            <Link className={cx('url')} to=''>
              <LinkIcon /> facebook.com
            </Link>
          </div>
        </div>
      </div>
      <div className={cx('videos-wrapper')}>
        <h4>Videos</h4>
        <div className={cx('videos')}>
          <div className={cx('player')}>
            <video className={cx('user-video')} muted playsInline loop>
              <source src='https://files.fullstack.edu.vn/f8-tiktok/videos/1921-64189301a39f9.mp4' type='video/mp4' />
            </video>
            <span className={cx('views')}>
              <PlayIcon />
              699.6K
            </span>
          </div>
          <div className={cx('player')}>
            <video className={cx('user-video')} muted playsInline loop>
              <source src='https://files.fullstack.edu.vn/f8-tiktok/videos/1921-64189301a39f9.mp4' type='video/mp4' />
            </video>
            <span className={cx('views')}>
              <PlayIcon />
              699.6K
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
