import React, { useContext } from 'react'
import ReactDOM from 'react-dom'
import { AppContext } from '~/contexts/app.context'
import { useEffect, useMemo, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CloseIcon, MoreIcon, Muted, NextIcon, PauseBtn, PlayBtn, PrevIcon, Unmuted } from '~/constants/icons'
import { faHeart, faCommentDots, faBookmark, faShare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { commentSchema } from '~/utils/rules'
import { deleteComment, getComments, postComment } from '~/apis/auth.api'
import Image from '~/components/Image/Image'
import Button from '~/components/Button'
import ReactButton from '~/components/ReactButton'
import Tippy from '@tippyjs/react/headless'
import Wrapper from '~/components/Wrapper'
import formatDuration from 'format-duration'
import formatTime from '~/utils/formatTime'
import classNames from 'classnames/bind'
import styles from './Video.module.scss'
import { getProfile } from '~/utils/auth'

const cx = classNames.bind(styles)

function Video() {
  const { isAuthenticated } = useContext(AppContext)
  const queryClient = useQueryClient()
  const { state, key } = useLocation()
  const video = state.video || state.nextVideo
  const videoList = state.videoList
  const navigate = useNavigate()
  const videoRef = useRef()
  const progressBarRef = useRef()
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(commentSchema)
  })

  const postCommentMutation = useMutation({
    mutationFn: (data) => postComment(video.uuid, data)
  })

  const deleteCommentMutation = useMutation({
    mutationFn: (commentId) => deleteComment(commentId)
  })

  const { data: commentsData } = useQuery({
    queryKey: ['comments', video.id],
    queryFn: () => getComments(video.id)
  })

  const comments = commentsData?.data?.data

  useEffect(() => {
    const video = videoRef.current
    const progressBar = progressBarRef.current

    const updateProgressBar = () => {
      const value = (video.currentTime / video.duration) * 100
      setProgress(value)
      setCurrentTime(video.currentTime)
    }

    const handleProgressBarChange = () => {
      const seekToTime = (progressBar.value / 100) * video.duration
      video.currentTime = seekToTime
    }

    video.addEventListener('timeupdate', updateProgressBar)
    progressBar.addEventListener('input', handleProgressBarChange)

    return () => {
      video.removeEventListener('timeupdate', updateProgressBar)
      progressBar.removeEventListener('input', handleProgressBarChange)
    }
  }, [])

  // Sử dụng thư viện format-duration để định dạng thời gian hiện tại và thời lượng video
  const formattedCurrentTime = useMemo(() => {
    return formatDuration(currentTime * 1000, {
      leading: true
    })
  }, [currentTime])
  const formattedDuration = videoRef.current
    ? formatDuration(videoRef.current.duration * 1000, {
        leading: true
      })
    : '00:00'

  const onSubmit = handleSubmit((data) => {
    postCommentMutation.mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries(['video', video.id])
      },
      onError: (err) => {
        if (err.response.status === 401) {
          toast.error('Please login to comment', {
            autoClose: 1000,
            position: 'top-center'
          })
        } else if (err.response.status === 422) {
          toast.error('Comment is required', {
            autoClose: 1000,
            position: 'top-center'
          })
        }
      }
    })
  })

  const handleDeleteComment = (commentId) => {
    deleteCommentMutation.mutate(commentId, {
      onSuccess: () => {
        queryClient.invalidateQueries(['video', video.id])
      }
    })
  }

  const goNextVideo = () => {
    const currentVideoIndex = videoList.findIndex((item) => item.id === video.id)
    if (currentVideoIndex === videoList.length - 1) {
      navigate('/')
    } else {
      const nextVideo = videoList[currentVideoIndex + 1]
      if (nextVideo) {
        navigate(`/@${nextVideo.user.nickname}/video/${nextVideo.uuid}`, {
          state: {
            nextVideo,
            videoList
          },
          key: nextVideo.id // key để React biết component Video đã được render trước đó và sẽ không render lại component này
          // Dùng để lưu trữ state của component Video trước đó, tránh việc next video bị render lại video cũ
        })
      }
    }
  }

  const goPrevVideo = () => {
    const currentVideoIndex = videoList.findIndex((item) => item.id === video.id)
    if (currentVideoIndex === 0) {
      navigate('/')
    } else {
      const prevVideo = videoList[currentVideoIndex - 1]
      if (prevVideo) {
        navigate(`/@${prevVideo.user.nickname}/video/${prevVideo.uuid}`, {
          state: {
            prevVideo,
            videoList
          },
          key: prevVideo.id // key để React biết component Video đã được render trước đó và sẽ không render lại component này
          // Dùng để lưu trữ state của component Video trước đó, tránh việc prev video bị render lại video cũ
        })
      }
    }
  }

  return ReactDOM.createPortal(
    // gắn component Modal vào document.body element
    <React.Fragment key={key}>
      <div className={cx('modal-wrapper')} aria-modal aria-hidden tabIndex={-1} role='dialog'>
        <div className={cx('modal-left')}>
          <button
            className={cx('btn-close')}
            onClick={() => {
              navigate('/')
            }}
          >
            <CloseIcon />
          </button>
          <div className={cx('group-btn')}>
            <button className={cx('btn-more')}>
              <MoreIcon />
            </button>
            <div className={cx('btn-controls')}>
              <button className={cx('btn-prev')} onClick={goPrevVideo}>
                <PrevIcon />
              </button>
              <button className={cx('btn-next')} onClick={goNextVideo}>
                <NextIcon />
              </button>
            </div>
            <button
              className={cx('btn-mute')}
              onClick={() => {
                setIsMuted((prevIsMuted) => !prevIsMuted)
              }}
            >
              {isMuted ? <Unmuted /> : <Muted />}
            </button>
          </div>
          <div className={cx('video')}>
            <video ref={videoRef} poster={video.thumb_url} muted={isMuted} playsInline autoPlay loop>
              <source src={video.file_url} type='video/mp4' />
            </video>
            <input
              type='range'
              className={cx('progress-bar')}
              value={progress}
              step='1'
              min='0'
              max='100'
              ref={progressBarRef}
              onChange={() => {
                // Do nothing
              }}
            ></input>
            <span className={cx('time-update')}>
              {formattedCurrentTime}/{formattedDuration}
            </span>
            <button
              className={cx('btn-control')}
              onClick={() => {
                setIsPlaying((prevIsPlaying) => !prevIsPlaying)
                videoRef.current[isPlaying ? 'pause' : 'play']()
              }}
            >
              {isPlaying ? <PauseBtn /> : <PlayBtn />}
            </button>
          </div>
        </div>
        <div className={cx('modal-right')}>
          <div className={cx('comment-container')}>
            <div className={cx('profile-wrapper')}>
              <div className={cx('info')}>
                <Link to={`/@${video.user.nickname}`} className={cx('avatar')}>
                  <Image
                    src={
                      video.user.avatar !== 'https://files.fullstack.edu.vn/f8-tiktok/'
                        ? video.user.avatar
                        : 'https://i.pinimg.com/736x/9a/63/e1/9a63e148aaff53532b045f6d1f09d762.jpg'
                    }
                    alt={video.user.nickname}
                  />
                </Link>
                <Link to={`/@${video.user.nickname}`} className={cx('name')}>
                  <span className={cx('username')}>{video.user.nickname}</span>
                  <span className={cx('nickname')}>
                    {video.user.first_name} {video.user.last_name} · {formatTime(video.created_at)}
                  </span>
                </Link>
                {!video.user.is_followed && (
                  <Button className={cx('btn-follow')} primary>
                    Follow
                  </Button>
                )}
              </div>
              <div className={cx('content')}>{video.description}</div>
            </div>
            <div className={cx('react-wrapper')}>
              <div className={cx('btn-group')}>
                <div className={cx('btn-item')}>
                  <ReactButton className={'btn-react'} icon={faHeart} react={true} video={video} />
                  <span>{video.likes_count}</span>
                </div>
                <div className={cx('btn-item')}>
                  <ReactButton className={'btn-react'} icon={faCommentDots} />
                  <span>{video.comments_count}</span>
                </div>
                <div className={cx('btn-item')}>
                  <ReactButton className={'btn-react'} icon={faBookmark} />
                  <span>{video.shares_count}</span>
                </div>
                <div className={cx('btn-item')}>
                  <ReactButton className={'btn-react'} icon={faShare} />
                  <span>{video.shares_count}</span>
                </div>
              </div>
              <div className={cx('copy-link')}>
                <p>{window.location.href}</p>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href)
                    toast.success('Copied to clipboard', {
                      autoClose: 700,
                      position: 'top-center'
                    })
                  }}
                >
                  Copy Link
                </button>
              </div>
            </div>
            <div className={cx('tab-menu-wrapper')}></div>
            <div className={cx('comment-item-wrapper')}>
              {comments?.map((comment) => (
                <div className={cx('comment-item')} key={comment.id}>
                  <div className={cx('info')}>
                    <Link to={`/@${comment.user.nickname}`} className={cx('avatar')}>
                      <Image
                        src={
                          comment.user.avatar !== 'https://files.fullstack.edu.vn/f8-tiktok/'
                            ? comment.user.avatar
                            : 'https://i.pinimg.com/736x/9a/63/e1/9a63e148aaff53532b045f6d1f09d762.jpg'
                        }
                        alt={comment.user.nickname}
                      />
                    </Link>
                    <Link to={`/@${comment.user.nickname}`} className={cx('name')}>
                      <span className={cx('username')}>{comment.user.nickname}</span>
                      <span className={cx('comment')}>{comment.comment}</span>
                      <span className={cx('nickname')}>{formatTime(comment.created_at)}</span>
                    </Link>
                  </div>
                  <div>
                    {isAuthenticated && comment.user.id === getProfile('profile').id && (
                      <Tippy
                        placement='bottom-end'
                        interactive={true}
                        render={(attrs) => (
                          <div className={cx('option')} tabIndex='-1' {...attrs}>
                            <Wrapper>
                              <button
                                className={cx('btn-delete')}
                                onClick={() => {
                                  handleDeleteComment(comment.id)
                                }}
                              >
                                <FontAwesomeIcon icon={faTrash} />
                                Delete
                              </button>
                            </Wrapper>
                          </div>
                        )}
                      >
                        <button className={cx('btn-option')}>
                          <MoreIcon />
                        </button>
                      </Tippy>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={cx('add-comment')}>
            <form className={cx('comment-wrapper')} onSubmit={onSubmit}>
              <div className={cx('comment-input')}>
                <input type='text' placeholder='Add a comment...' {...register('comment')} />
              </div>
              <button type='submit' className={cx('btn-post')}>
                Post
              </button>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>,
    document.body
  )
}

export default Video
