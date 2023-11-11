import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames/bind'
import styles from './ReactButton.module.scss'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { likeVideo, unlikeVideo } from '~/apis/auth.api'

const cx = classNames.bind(styles)

function ReactButton({ icon, count, react, video }) {
  const queryClient = useQueryClient()
  const likeVideoMutation = useMutation({
    mutationFn: (id) => likeVideo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['videoList'],
        exact: true
      })
    }
  })

  const handleLikeVideo = (videoId) => {
    likeVideoMutation.mutate(videoId)
  }

  const unlikeVideoMutation = useMutation({
    mutationFn: (id) => unlikeVideo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['videoList'],
        exact: true
      })
    }
  })

  const handleunlikeVideo = (videoId) => {
    unlikeVideoMutation.mutate(videoId)
  }

  return (
    <div className={cx('btn-wrapper')}>
      {react ? (
        <button
          className={cx('custom-button')}
          onClick={() => {
            if (video.is_liked) {
              handleunlikeVideo(video.id)
            } else {
              handleLikeVideo(video.id)
            }
          }}
        >
          <FontAwesomeIcon
            className={cx('react-icon', {
              'is-liked': video.is_liked
            })}
            icon={icon}
          />
        </button>
      ) : (
        <button className={cx('custom-button')}>
          <FontAwesomeIcon className={cx('react-icon')} icon={icon} />
        </button>
      )}
      <div className={cx('amount')}>{count}</div>
    </div>
  )
}

export default ReactButton

ReactButton.propTypes = {
  icon: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  react: PropTypes.bool,
  video: PropTypes.object
}
