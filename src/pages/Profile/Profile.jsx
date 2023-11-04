import Image from '~/components/Image'
import Button from '~/components/Button'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { LinkIcon, PlayIcon } from '~/constants/icons'
import { useQuery } from '@tanstack/react-query'
import { getProfile } from '~/apis/auth.api'
import { getProfile as getProfileFromLS } from '~/utils/auth'
import classNames from 'classnames/bind'
import styles from './Profile.module.scss'
import path from '~/constants/path'

const cx = classNames.bind(styles)

function Profile() {
  const { nickname } = useParams()
  const navigate = useNavigate()
  const { data: userData } = useQuery({
    queryKey: ['user', nickname],
    queryFn: () => getProfile(nickname)
  })

  const user = userData?.data.data
  const videos = user?.videos

  const navigateToEditProfile = () => {
    // Cách 1: sử dụng location.state để truyền thông tin user hiện tại
    // navigate(path.editProfile, {
    //   state: {
    //     user
    //   }
    // })

    // Cách 2: fetch API để lấy thông tin user hiện tại
    user && navigate(path.editProfile)
  }

  return (
    <div>
      <div className={cx('container')}>
        <div className={cx('bottom-line')}>
          <div className={cx('info-wrapper')}>
            <div className={cx('user-info')}>
              <Image className={cx('avatar')} src={user?.avatar} alt={user?.nickname} />
              <div className={cx('user-title')}>
                <h3 className={cx('name')}>{user?.nickname}</h3>
                <div className={cx('nickname')}>
                  {user?.first_name} {user?.last_name}
                </div>
                {user && user.nickname === getProfileFromLS().nickname ? (
                  <Button className={cx('btn-edit')} onClick={navigateToEditProfile}>
                    Edit Profile
                  </Button>
                ) : user?.is_followed ? (
                  <Button className={cx('btn-follow')} primary>
                    Unfollow
                  </Button>
                ) : (
                  <Button className={cx('btn-follow')} primary>
                    Follow
                  </Button>
                )}
              </div>
            </div>
            <div className={cx('user-subinfo')}>
              <div className={cx('count-info')}>
                <strong>{user?.followings_count}</strong>
                <span>Following</span>
              </div>
              <div className={cx('count-info')}>
                <strong>{user?.followers_count}</strong>
                <span>Followers</span>
              </div>
              <div className={cx('count-info')}>
                <strong>{user?.likes_count}</strong>
                <span>Likes</span>
              </div>
            </div>
            <div className={cx('desc')}>{user?.bio}</div>
            <Link className={cx('url')} to=''>
              <LinkIcon />{' '}
              {user?.facebook_url || user?.instagram_url || user?.youtube_url || user?.twitter_url || 'No URL'}
            </Link>
          </div>
        </div>
      </div>
      <div className={cx('videos-wrapper')}>
        <h4>Videos</h4>
        <div className={cx('videos')}>
          {videos?.map((video, index) => (
            <div className={cx('player')} key={video.id || index}>
              <video
                className={cx('user-video')}
                poster={video.thumb_url}
                muted
                playsInline
                loop
                onMouseOver={(event) => event.target.play()}
                onMouseOut={(event) => {
                  event.target.src = video.file_url
                  return event.target.pause()
                }}
              >
                <source src={video.file_url} type='video/mp4' />
              </video>
              <span className={cx('views')}>
                <PlayIcon />
                {video.views_count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Profile
