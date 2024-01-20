import { useInfiniteQuery, useMutation } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import { useContext, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { Link, useNavigate } from 'react-router-dom'
import { faHeart, faCommentDots, faBookmark, faShare } from '@fortawesome/free-solid-svg-icons'
import { getVideoList } from '~/apis/video.api'
import Image from '~/components/Image'
import Button from '~/components/Button'
import VideoPlayer from '~/pages/Home/VideoPlayer'
import ReactButton from '~/components/ReactButton'
import { followUser } from '~/apis/auth.api'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { getProfile } from '~/apis/auth.api'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { AppContext } from '~/contexts/app.context'
import { useTranslation } from 'react-i18next'
import path from '~/constants/path'
import classNames from 'classnames/bind'
import styles from './Home.module.scss'

const cx = classNames.bind(styles)

function Home() {
  const { t } = useTranslation(['home'])
  const { isAuthenticated } = useContext(AppContext)
  const { ref, inView } = useInView()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { data, isFetched, refetch, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['videoList'],
    queryFn: ({ pageParam }) => getVideoList('for-you', pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.data.data.length ? allPages.length + 1 : undefined // Nếu lastPage có dữ liệu thì mới tăng page lên
      return nextPage
    }
  })
  const videoList = data?.pages.flatMap((page) => page.data.data)

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage])

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
          autoClose: 1000
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

  const navigateToVideo = (nickname, uuid, video) => {
    navigate(`/@${nickname}/video/${uuid}`, {
      state: {
        video,
        videoList,
        prevPath: path.home
      }
    })
  }

  const content = videoList?.map((video, index) => {
    if (videoList.length === index + 1) {
      return (
        <div key={video.id} className={cx('wrapper')} ref={ref}>
          <div className={cx('list-item-container')}>
            <Link
              className={cx('avatar-wrapper')}
              to={`/@${video.user.nickname}`}
              onMouseEnter={() => handlePrefetchingUser(`@${video.user.nickname}`)}
            >
              <Image className={cx('avatar')} src={video.user.avatar} alt={video.user.nickname} />
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
                    {t('Follow')}
                  </Button>
                )}
              </div>
              <div className={cx('video')}>
                <VideoPlayer video={video} navigateToVideo={navigateToVideo} />
                <div className={cx('btn-react-wrapper')}>
                  <ReactButton
                    className={'custom-button'}
                    icon={faHeart}
                    count={video.likes_count}
                    react={true}
                    video={video}
                  />
                  <ReactButton className={'custom-button'} icon={faCommentDots} count={video.comments_count} />
                  <ReactButton className={'custom-button'} icon={faBookmark} count={video.views_count} />
                  <ReactButton className={'custom-button'} icon={faShare} count={video.shares_count} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div key={video.id} className={cx('wrapper')}>
        <div className={cx('list-item-container')}>
          <Link
            className={cx('avatar-wrapper')}
            to={`/@${video.user.nickname}`}
            onMouseEnter={() => handlePrefetchingUser(`@${video.user.nickname}`)}
          >
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
              {isAuthenticated && !video.user.is_followed && (
                <Button primary className={cx('custom-follow')} onClick={() => handleFollow(video.user.id)}>
                  {t('Follow')}
                </Button>
              )}
            </div>
            <div className={cx('video')}>
              <VideoPlayer video={video} navigateToVideo={navigateToVideo} />
              <div className={cx('btn-react-wrapper')}>
                <ReactButton
                  className={'custom-button'}
                  icon={faHeart}
                  count={video.likes_count}
                  react={isAuthenticated ? true : false}
                  video={video}
                />
                <ReactButton className={'custom-button'} icon={faCommentDots} count={video.comments_count} />
                <ReactButton className={'custom-button'} icon={faBookmark} count={video.views_count} />
                <ReactButton className={'custom-button'} icon={faShare} count={video.shares_count} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  })

  return (
    <>
      <div className={cx('container')}>
        <Helmet>
          <title>TikTok - Make Your Day</title>
          <meta
            name='description'
            content='
            TikTok - Make Your Day
          '
          />
        </Helmet>
        {isFetched
          ? content
          : Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className={cx('wrapper')}>
                <div className={cx('list-item-container')}>
                  <Skeleton height={40} width={40} circle duration={2} />
                  <div className={cx('content-container')}>
                    <div className={cx('text-info')}>
                      <Skeleton height={20} width={150} duration={2} />
                      <Skeleton height={15} width={100} duration={2} />
                    </div>
                    <div className={cx('video')}>
                      <Skeleton
                        height={600}
                        width={350}
                        duration={2}
                        style={{
                          borderRadius: '10px'
                        }}
                      />
                      <div className={cx('btn-react-wrapper')}>
                        <Skeleton height={20} width={20} duration={2} />
                        <Skeleton height={20} width={20} duration={2} />
                        <Skeleton height={20} width={20} duration={2} />
                        <Skeleton height={20} width={20} duration={2} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </>
  )
}

export default Home
