import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useQuery } from '@tanstack/react-query'
import { getProfile } from '~/apis/auth.api'
import { useNavigate } from 'react-router-dom'
import Button from '~/components/Button'
import Image from '~/components/Image'
import classNames from 'classnames/bind'
import { useTranslation } from 'react-i18next'
import styles from './UserVideo.module.scss'
import path from '~/constants/path'

const cx = classNames.bind(styles)

function UserVideo({ user }) {
  const { t } = useTranslation(['following'])
  const navigate = useNavigate()
  const [video, setVideo] = useState()
  const { data } = useQuery({
    queryKey: ['user', user.nickname],
    queryFn: () => getProfile(`@${user.nickname}`)
  })

  useEffect(() => {
    if (data && data.data.data.videos.length > 0) {
      setVideo(data.data.data.videos[0])
    } else {
      setVideo(null)
    }
  }, [data])

  const playVideoWhenMouseEnter = (e) => {
    e.target.play()
  }

  const stopVideoWhenMouseLeave = (e) => {
    e.target.pause()
    e.target.currentTime = 0
  }

  return (
    <div
      className={cx('user-card')}
      onClick={() => {
        navigate({
          pathname: path.following.replace('following', `@${user.nickname}`)
        })
      }}
    >
      {video ? (
        <video
          poster={video.thumb_url}
          muted
          playsInline
          loop
          onMouseEnter={(e) => playVideoWhenMouseEnter(e)}
          onMouseLeave={(e) => stopVideoWhenMouseLeave(e)}
        >
          <source src={video.file_url} type='video/mp4' />
        </video>
      ) : (
        <div className={cx('no-video')}></div>
      )}
      <div className={cx('user-info')}>
        <div className={cx('user-avatar')}>
          <Image
            src={
              user.avatar !== 'https://files.fullstack.edu.vn/f8-tiktok/'
                ? user.avatar
                : 'https://i.pinimg.com/736x/9a/63/e1/9a63e148aaff53532b045f6d1f09d762.jpg'
            }
            alt={user.nickname}
          />
        </div>
        <div className={cx('user-name')}>
          {user.first_name} {user.last_name}
        </div>
        <div className={cx('nickname')}>{user.nickname}</div>
        <Button className={cx('follow-btn')}>{t('Following')}</Button>
      </div>
    </div>
  )
}

export default UserVideo

UserVideo.propTypes = {
  user: PropTypes.object.isRequired
}
