import { useContext, useEffect, useState } from 'react'
import Image from '~/components/Image'
import Button from '~/components/Button'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { LinkIcon, PlayIcon } from '~/constants/icons'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { followUser, getProfile, unfollowUser } from '~/apis/auth.api'
import { getProfile as getProfileFromLS } from '~/utils/auth'
import { toast } from 'react-toastify'
import { AppContext } from '~/contexts/app.context'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import path from '~/constants/path'
import classNames from 'classnames/bind'
import styles from './Profile.module.scss'

const cx = classNames.bind(styles)

function Profile() {
  const { isAuthenticated, setShowModal } = useContext(AppContext)
  const queryClient = useQueryClient()
  const [user, setUser] = useState()
  const { nickname } = useParams()
  const navigate = useNavigate()
  const { data: userData, isFetched } = useQuery({
    queryKey: ['user', nickname],
    queryFn: () => getProfile(nickname),
    staleTime: 1000 * 10 // Nếu dữ liệu từ lúc hover tới lúc click vào account item chưa quá 10s thì ko fetch lại
    // Không fetch lại đồng nghĩa với việc sẽ không có data, nên sẽ phải dùng useEffect để set data
  })

  // Nếu không gọi API thì dùng cách này để lấy thông tin user hiện tại
  useEffect(() => {
    if (userData) {
      setUser(userData.data.data)
    }
  }, [userData])

  const refetchProfile = () => {
    // refetch data mỗi khi follow user
    queryClient.invalidateQueries({
      queryKey: ['followingUsers'],
      exact: true
    })
    queryClient.invalidateQueries({
      queryKey: ['suggestedUsers'],
      exact: true
    })
    queryClient.prefetchQuery({
      queryKey: ['user', nickname],
      queryFn: () => getProfile(nickname)
    })
  }

  const followMutation = useMutation({
    mutationFn: (id) => followUser(id)
  })

  const handleFollow = (id) => {
    followMutation.mutate(id, {
      onSuccess: () => {
        toast.success('Followed', {
          autoClose: 1000
        })
        refetchProfile()
      }
    })
  }

  const unFollowMutation = useMutation({
    mutationFn: (id) => unfollowUser(id)
  })

  const handleUnFollow = (id) => {
    unFollowMutation.mutate(id, {
      onSuccess: () => {
        toast.success('Unfollowed', {
          autoClose: 1000
        })
        refetchProfile()
      }
    })
  }

  const navigateToEditProfile = () => {
    user && navigate(path.editProfile)
  }

  const navigateToVideo = (nickname, uuid, video) => {
    user &&
      navigate(`/@${nickname}/video/${uuid}`, {
        state: {
          video,
          videoList: user.videos,
          prevPath: `/@${nickname}`
        }
      })
  }

  if (!user || !isFetched)
    return (
      <div>
        <div className={cx('container')}>
          <div className={cx('bottom-line')}>
            <div className={cx('info-wrapper')}>
              <div className={cx('user-info')}>
                <Skeleton circle={true} height={116} width={116} />
                <div className={cx('user-title')}>
                  <h3 className={cx('name')}>
                    <Skeleton />
                  </h3>
                  <div className={cx('nickname')}>
                    <Skeleton />
                  </div>
                </div>
              </div>
              <Skeleton count={3} />
            </div>
          </div>
        </div>
        <div className={cx('videos-wrapper')}>
          <h4>Videos</h4>
          <div className={cx('videos')}>
            {Array.from({ length: 3 }).map((_, index) => (
              <div className={cx('player')} key={index}>
                <Skeleton height={200} width={300} duration={2} />
                <span className={cx('views')}>
                  <PlayIcon />
                  <Skeleton />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )

  return (
    <div>
      <div className={cx('container')}>
        <div className={cx('bottom-line')}>
          <div className={cx('info-wrapper')}>
            <div className={cx('user-info')}>
              <Image className={cx('avatar')} src={user.avatar} alt={user.nickname} />
              <div className={cx('user-title')}>
                <h3 className={cx('name')}>{user.nickname}</h3>
                <div className={cx('nickname')}>
                  {user.first_name} {user.last_name}
                </div>
                {isAuthenticated ? (
                  user &&
                  (user.nickname === getProfileFromLS().nickname ? (
                    <Button className={cx('btn-edit')} onClick={navigateToEditProfile}>
                      Edit Profile
                    </Button>
                  ) : user.is_followed ? (
                    <Button className={cx('btn-follow')} primary onClick={() => handleUnFollow(user.id)}>
                      Unfollow
                    </Button>
                  ) : (
                    <Button className={cx('btn-follow')} primary onClick={() => handleFollow(user.id)}>
                      Follow
                    </Button>
                  ))
                ) : (
                  <Button
                    className={cx('btn-follow')}
                    primary
                    onClick={() => {
                      setShowModal(true)
                    }}
                  >
                    Follow
                  </Button>
                )}
              </div>
            </div>
            <div className={cx('user-subinfo')}>
              <div className={cx('count-info')}>
                <strong>{user.followings_count}</strong>
                <span>Following</span>
              </div>
              <div className={cx('count-info')}>
                <strong>{user.followers_count}</strong>
                <span>Followers</span>
              </div>
              <div className={cx('count-info')}>
                <strong>{user.likes_count}</strong>
                <span>Likes</span>
              </div>
            </div>
            <div className={cx('desc')}>{user.bio}</div>
            <Link className={cx('url')} to=''>
              <LinkIcon /> {user.facebook_url || user.instagram_url || user.youtube_url || user.twitter_url || 'No URL'}
            </Link>
          </div>
        </div>
      </div>
      <div className={cx('videos-wrapper')}>
        <h4>Videos</h4>
        <div className={cx('videos')}>
          {user.videos.map((video, index) => (
            <div
              className={cx('player')}
              key={video.id || index}
              onClick={() => navigateToVideo(user.nickname, video.uuid, video)}
            >
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
