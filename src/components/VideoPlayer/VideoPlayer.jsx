import { useRef, useEffect, useState } from 'react'
import formatDuration from 'format-duration'
import classNames from 'classnames/bind'
import styles from './VideoPlayer.module.scss'
import { PlayBtn, PauseBtn, Muted, Unmuted } from '~/constants/icons'

const cx = classNames.bind(styles)

function VideoPlayer({ video }) {
  const videoRef = useRef()
  const progressBarRef = useRef()
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoRef.current.play()
            setIsPlaying(true)
            setIsMuted(true)
          } else {
            videoRef.current.pause()
            videoRef.current.currentTime = 0
            setIsPlaying(false)
          }
        })
      },
      { threshold: 0.7 }
    )
    const currentVideoRef = videoRef.current

    observer.observe(currentVideoRef)

    // Hủy đăng ký IntersectionObserver khi component bị unmount (cleanup function)
    return () => {
      if (currentVideoRef) {
        observer.unobserve(currentVideoRef)
      }
    }
  }, [videoRef])

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
  }, []) // Chỉ chạy 1 lần duy nhất khi component được render lần đầu tiên

  // Sử dụng thư viện format-duration để định dạng thời gian hiện tại và thời lượng video
  const formattedCurrentTime = formatDuration(currentTime * 1000, {
    leading: true
  })
  const formattedDuration = videoRef.current
    ? formatDuration(videoRef.current.duration * 1000, {
        leading: true
      })
    : '00:00'

  return (
    <div className={cx('video-wrapper')}>
      <video ref={videoRef} poster={video.thumb_url} muted playsInline autoPlay loop>
        <source src={video.file_url} type='video/mp4' />
      </video>
      <input
        type='range'
        className={cx('progress-bar')}
        defaultValue={progress}
        step='1'
        min='0'
        max='100'
        ref={progressBarRef}
      ></input>
      <span className={cx('time-update')}>
        {formattedCurrentTime}/{formattedDuration}
      </span>
      {isPlaying ? (
        <button
          className={cx('btn-control')}
          onClick={() => {
            setIsPlaying(false)
            videoRef.current.pause()
          }}
        >
          <PauseBtn />
        </button>
      ) : (
        <button
          className={cx('btn-control')}
          onClick={() => {
            setIsPlaying(true)
            videoRef.current.play()
          }}
        >
          <PlayBtn />
        </button>
      )}
      {isMuted ? (
        <button
          className={cx('btn-sound')}
          onClick={() => {
            setIsMuted(false)
            videoRef.current.muted = false
          }}
        >
          <Unmuted />
        </button>
      ) : (
        <button
          className={cx('btn-sound')}
          onClick={() => {
            setIsMuted(true)
            videoRef.current.muted = true
          }}
        >
          <Muted />
        </button>
      )}
    </div>
  )
}

export default VideoPlayer
