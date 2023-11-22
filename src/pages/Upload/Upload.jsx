import { useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { UploadIcon } from '~/constants/icons'
import Button from '~/components/Button'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { videoSchema } from '~/utils/rules'
import { useMutation } from '@tanstack/react-query'
import { createNewVideo } from '~/apis/video.api'
import { toast } from 'react-toastify'
import classNames from 'classnames/bind'
import styles from './Upload.module.scss'

const cx = classNames.bind(styles)

function Upload() {
  const inputRef = useRef()
  const [source, setSource] = useState()
  const [file, setFile] = useState()
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(videoSchema)
  })

  const { ref: fileInputRef, ...fileInputProps } = register('upload_file')

  const createVideoMutation = useMutation({
    mutationFn: (data) => createNewVideo(data)
  })

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    setFile(file)

    // Mếu trước đó đã có file thì xóa đi
    if (source) {
      URL.revokeObjectURL(source)
    }

    const url = URL.createObjectURL(file)
    setSource(url)
  }

  const handleChoose = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData()
    formData.append('upload_file', file)
    formData.append('description', data.description)
    formData.append('thumbnail_time', 2)
    formData.append('viewable', 'public')
    formData.append('allows[]', 'comment')
    await createVideoMutation.mutateAsync(formData)
    setSource(null)
    setFile(null)
    toast.success('Upload video successfully', {
      autoClose: 1000
    })
  })

  if (createVideoMutation.isPending)
    return ReactDOM.createPortal(
      <div className={cx('modal')}>
        <div className={cx('overlay')}></div>
        <div className={cx('loading')}>
          <div></div>
          <div></div>
        </div>
      </div>,
      document.body
    )

  return (
    <form className={cx('container')} onSubmit={onSubmit}>
      <input
        ref={(e) => {
          fileInputRef(e)
          inputRef.current = e
        }}
        type='file'
        accept='video/*'
        {...fileInputProps}
        onChange={handleFileChange}
      />
      {!source && (
        <div className={cx('upload')} onClick={handleChoose}>
          <UploadIcon />
          <div className={cx('text-main')}>Select video to upload</div>
          <div className={cx('sub-text')}>Or drag and drop a file</div>
          <div className={cx('text-video-info')}>
            <span>MP4 or WebM</span>
            <span>720x1280 resolution or higher</span>
            <span>Up to 10 minutes</span>
            <span>Less than 10 GB</span>
          </div>
          <div className={cx('file-select')}>
            <Button className={cx('btn-select-file')} primary>
              Select File
            </Button>
          </div>
        </div>
      )}
      {source && (
        <div className={cx('layout-video')}>
          <div className={cx('video-wrapper')}>
            <video controls>
              <source src={source} />
            </video>
          </div>
          <div className={cx('desc')}>
            <input type='text' placeholder='Description video' {...register('description')} />
            <div className={cx('file-select')}>
              <Button
                className={cx('btn-select-file')}
                primary
                {...(createVideoMutation.isLoading && {
                  disabled: true
                })}
              >
                Publish
              </Button>
            </div>
          </div>
        </div>
      )}
    </form>
  )
}

export default Upload
