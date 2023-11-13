import React, { useEffect, useMemo, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { CloseIcon, MoreIcon, Muted, NextIcon, PrevIcon, Unmuted } from '~/constants/icons'
import { faHeart, faCommentDots, faBookmark, faShare } from '@fortawesome/free-solid-svg-icons'
import formatDuration from 'format-duration'
import classNames from 'classnames/bind'
import styles from './Modal.module.scss'
import { Link } from 'react-router-dom'
import Image from '~/components/Image/Image'
import Button from '../Button'
import ReactButton from '~/components/ReactButton'
import { toast } from 'react-toastify'

const cx = classNames.bind(styles)

function Modal({ isShowing, hide, video }) {
  const videoRef = useRef()
  const progressBarRef = useRef()
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [isMuted, setIsMuted] = useState(isShowing ? false : true)

  useEffect(() => {
    if (isShowing) {
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
    }
  }, [isShowing])

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

  if (!isShowing) return null
  return ReactDOM.createPortal(
    // gắn component Modal vào document.body element
    <React.Fragment>
      <div className={cx('modal-wrapper')} aria-modal aria-hidden tabIndex={-1} role='dialog'>
        <div className={cx('modal-left')}>
          <button className={cx('btn-close')} onClick={hide}>
            <CloseIcon />
          </button>
          <div className={cx('group-btn')}>
            <button className={cx('btn-more')}>
              <MoreIcon />
            </button>
            <div className={cx('btn-control')}>
              <button className={cx('btn-prev')}>
                <PrevIcon />
              </button>
              <button className={cx('btn-next')}>
                <NextIcon />
              </button>
            </div>
            <button
              className={cx('btn-mute')}
              onClick={() => {
                setIsMuted((prevIsMuted) => !prevIsMuted)
                videoRef.current.muted = !isMuted
              }}
            >
              {isMuted ? <Unmuted /> : <Muted />}
            </button>
          </div>
          <div className={cx('video')}>
            <video ref={videoRef} poster={video.thumb_url} muted playsInline autoPlay loop>
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
          </div>
        </div>
        <div className={cx('modal-right')}>
          <div className={cx('comment-container')}>
            <div className={cx('profile-wrapper')}>
              <div className={cx('info')}>
                <Link to={''} className={cx('avatar')}>
                  <Image
                    src={
                      'https://media.licdn.com/dms/image/D560BAQE96KctT7x-iw/company-logo_200_200/0/1666170056007?e=2147483647&v=beta&t=U-5DmL_mYQaduEYyl0aVlabEvxP6-F5nZE9daao6Wuk'
                    }
                    alt={'avatar'}
                  />
                </Link>
                <Link to={''} className={cx('name')}>
                  <span className={cx('username')}>dclongg016</span>
                  <span className={cx('nickname')}>dclogg · 2d ago</span>
                </Link>
                <Button className={cx('btn-follow')} primary>
                  Follow
                </Button>
              </div>
              <div className={cx('content')}>He is power #sukuna #sukunaryomen #jjk #jjkedit #animeedit</div>
            </div>
            <div className={cx('react-wrapper')}>
              <div className={cx('btn-group')}>
                <div className={cx('btn-item')}>
                  <ReactButton className={'btn-react'} icon={faHeart} react={true} video={video} />
                  <span>0</span>
                </div>
                <ReactButton className={'btn-react'} icon={faCommentDots} />
                <ReactButton className={'btn-react'} icon={faBookmark} />
                <ReactButton className={'btn-react'} icon={faShare} />
              </div>
              <div className={cx('copy-link')}>
                <p>
                  https://www.tiktok.com/@dclogg016/video/7300095127408643361?is_from_webapp=1&sender_device=pc&web_id=7152718628831610370
                </p>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      'https://www.tiktok.com/@dclogg016/video/7300095127408643361?is_from_webapp=1&sender_device=pc&web_id=7152718628831610370'
                    )
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
              <div className={cx('info')}>
                <Link to={''} className={cx('avatar')}>
                  <Image
                    src={
                      'https://media.licdn.com/dms/image/D560BAQE96KctT7x-iw/company-logo_200_200/0/1666170056007?e=2147483647&v=beta&t=U-5DmL_mYQaduEYyl0aVlabEvxP6-F5nZE9daao6Wuk'
                    }
                    alt={'avatar'}
                  />
                </Link>
                <Link to={''} className={cx('name')}>
                  <span className={cx('username')}>dclongg016</span>
                  <span className={cx('comment')}>Hello anh em!</span>
                  <span className={cx('nickname')}>2d ago</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>,
    document.body
  )
}

export default Modal
