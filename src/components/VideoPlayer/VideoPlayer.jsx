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
            videoRef.current.currentTime = 0
          }
        })
      },
      { threshold: 0.8 }
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

  return (
    <video ref={videoRef} poster={video.thumb_url} muted controls playsInline autoPlay loop>
      <source src={video.file_url} type='video/mp4' />
    </video>
  )
}

export default VideoPlayer
