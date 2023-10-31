import { useMutation, useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { faHeart, faCommentDots, faBookmark, faShare } from '@fortawesome/free-solid-svg-icons'
import Image from '~/components/Image'
import Button from '~/components/Button'
import { getVideoList } from '~/apis/video.api'
import VideoPlayer from '~/components/VideoPlayer'
import ReactButton from '~/components/ReactButton'
import { followUser } from '~/apis/auth.api'
import { toast } from 'react-toastify'
import classNames from 'classnames/bind'
import styles from './Home.module.scss'

const cx = classNames.bind(styles)

function Home() {
  const { data, refetch } = useQuery({
    queryKey: ['videoList'],
    queryFn: () => getVideoList('for-you', 15)
  })
  const videoList = data?.data?.data

  const followAccountMutation = useMutation({
    mutationFn: (id) => followUser(id)
  })

  const handleFollow = (id) => {
    followAccountMutation.mutate(id, {
      onSuccess: () => {
        refetch()
        toast.success('Followed', {
          timeClose: 1000
        })
      }
    })
  }

  return (
    <div className={cx('container')}>
      {videoList?.map((video) => (
        <div key={video.id} className={cx('wrapper')}>
          <div className={cx('list-item-container')}>
            <Link to=''>
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
                <Link to='' className={cx('nickname')}>
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
                  <ReactButton icon={faHeart} count={video.likes_count} />
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
