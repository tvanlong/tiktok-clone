import React from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames/bind'
import styles from './Modal.module.scss'
import { CloseIcon, MoreIcon, Muted, NextIcon, PrevIcon } from '~/constants/icons'

const cx = classNames.bind(styles)

function Modal({ isShowing, hide, video }) {
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
            <button className={cx('btn-mute')}>
              <Muted />
            </button>
          </div>
          <div className={cx('video')}>
            <video poster={video.thumb_url} muted playsInline autoPlay loop>
              <source src={video.file_url} type='video/mp4' />
            </video>
          </div>
        </div>
        <div className={cx('modal-right')}></div>
      </div>
    </React.Fragment>,
    document.body
  )
}

export default Modal
