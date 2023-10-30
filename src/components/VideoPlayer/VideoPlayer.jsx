import { useRef, useEffect } from 'react'

function VideoPlayer({ video }) {
  const videoRef = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoRef.current.play()
          } else {
            videoRef.current.pause()
          }
        })
      },
      { threshold: 0.3 }
    )
    observer.observe(videoRef.current)
  }, [videoRef])

  return (
    <video ref={videoRef} poster={video.thumb_url} muted controls playsInline autoPlay loop>
      <source src={video.file_url} type='video/mp4' />
    </video>
  )
}

export default VideoPlayer
