import { useRef, useEffect, useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import formatDuration from 'format-duration'
import { PlayBtn, PauseBtn, Muted, Unmuted } from '~/constants/icons'
import classNames from 'classnames/bind'
import styles from './VideoPlayer.module.scss'
import Modal from '~/components/Modal'
import useModal from '~/hooks/useModal'

const cx = classNames.bind(styles)

function VideoPlayer({ video }) {
  const { isShowing, toggle } = useModal()
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

  return (
    <>
      <div className={cx('video-wrapper')}>
        <div
          className={cx('overlay')}
          onClick={() => {
            toggle()
            setIsPlaying(false)
            videoRef.current.pause()
            videoRef.current.currentTime = 0
          }}
        ></div>
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
        <button
          className={cx('btn-control')}
          onClick={() => {
            setIsPlaying((prevIsPlaying) => !prevIsPlaying)
            videoRef.current[isPlaying ? 'pause' : 'play']()
          }}
        >
          {isPlaying ? <PauseBtn /> : <PlayBtn />}
        </button>
        <button
          className={cx('btn-sound')}
          onClick={() => {
            setIsMuted((prevIsMuted) => !prevIsMuted)
            videoRef.current.muted = !isMuted
          }}
        >
          {isMuted ? <Unmuted /> : <Muted />}
        </button>
      </div>
      <Modal isShowing={isShowing} hide={toggle} video={video} />
    </>
  )
}

export default VideoPlayer

VideoPlayer.propTypes = {
  video: PropTypes.object
}
