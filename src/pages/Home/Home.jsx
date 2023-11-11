import { useMutation, useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { faHeart, faCommentDots, faBookmark, faShare } from '@fortawesome/free-solid-svg-icons'
import { getVideoList } from '~/apis/video.api'
import Image from '~/components/Image'
import Button from '~/components/Button'
import VideoPlayer from '~/components/VideoPlayer'
import ReactButton from '~/components/ReactButton'
import { followUser } from '~/apis/auth.api'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { getProfile } from '~/apis/auth.api'
import classNames from 'classnames/bind'
import styles from './Home.module.scss'

const cx = classNames.bind(styles)

function Home() {
  const queryClient = useQueryClient()
  const { data, refetch } = useQuery({
    queryKey: ['videoList'],
    queryFn: () => getVideoList('for-you', 1)
  })
  const videoList = data?.data?.data

  const followAccountMutation = useMutation({
    mutationFn: (id) => followUser(id)
  })

  const handlePrefetchingUser = (nickname) => {
    queryClient.prefetchQuery({
      queryKey: ['user', nickname],
      queryFn: () => getProfile(nickname),
      staleTime: 1000 * 10 // Kiểm tra cache sau 10s khi hover vào account item
    })
  }

  const handleFollow = (id) => {
    followAccountMutation.mutate(id, {
      onSuccess: () => {
        refetch()
        toast.success('Followed', {
          timeClose: 1000
        })
        queryClient.invalidateQueries({
          queryKey: ['followingUsers'],
          exact: true
        })
        queryClient.invalidateQueries({
          queryKey: ['suggestedUsers'],
          exact: true
        })
      }
    })
  }

  return (
    <div className={cx('container')}>
      {videoList?.map((video) => (
        <div key={video.id} className={cx('wrapper')}>
          <div className={cx('list-item-container')}>
            <Link to={`/@${video.user.nickname}`} onMouseEnter={() => handlePrefetchingUser(`@${video.user.nickname}`)}>
              <Image
                className={cx('avatar')}
                src={
                  video.user.avatar !== 'https://files.fullstack.edu.vn/f8-tiktok/'
                    ? video.user.avatar
                    : 'https://i.pinimg.com/736x/9a/63/e1/9a63e148aaff53532b045f6d1f09d762.jpg'
                }
                alt={video.user.nickname}
              />
            </Link>
            <div className={cx('content-container')}>
              <div className={cx('text-info')}>
                <Link to={`/@${video.user.nickname}`} className={cx('nickname')}>
                  {video.user.nickname}
                </Link>
                <span className={cx('username')}>
                  {video.user.first_name} {video.user.last_name}
                </span>
                <p className={cx('caption')}>{video.description}</p>
                {!video.user.is_followed && (
                  <Button primary className={cx('custom-follow')} onClick={() => handleFollow(video.user.id)}>
                    Follow
                  </Button>
                )}
              </div>
              <div className={cx('video')}>
                <VideoPlayer video={video} />
                <div className={cx('btn-react-wrapper')}>
                  <ReactButton icon={faHeart} count={video.likes_count} react={true} video={video} />
                  <ReactButton icon={faCommentDots} count={video.comments_count} />
                  <ReactButton icon={faBookmark} count={video.views_count} />
                  <ReactButton icon={faShare} count={video.shares_count} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Home
