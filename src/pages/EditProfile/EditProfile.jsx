import classNames from 'classnames/bind'
import styles from './EditProfile.module.scss'
import Image from '~/components/Image'
import { EditAvatar } from '~/constants/icons'
import Button from '~/components/Button'
import { useLocation } from 'react-router-dom'

const cx = classNames.bind(styles)

function EditProfile() {
  const location = useLocation()
  const { user } = location.state
  return (
    <div className={cx('wrapper')}>
      <div className={cx('content')}>
        <div className={cx('edit-container')}>
          <div className={cx('header-container')}>
            <h1 className={cx('header-title')}>Edit Profile</h1>
          </div>
          <div className={cx('content-container')}>
            <div className={cx('item-container')}>
              <div className={cx('label')}>Profile photo</div>
              <div className={cx('avatar-content')}>
                <div className={cx('avatar')}>
                  <Image src={user.avatar} alt={user.nickname} />
                </div>
                <div className={cx('avatar-edit')}>
                  <EditAvatar />
                  <input
                    type='file'
                    accept='.jpg,.jpeg,.png,.tiff,.heic,.webp'
                    className={cx('avatar-edit-input')}
                  ></input>
                </div>
              </div>
            </div>
            <div className={cx('item-container')}>
              <div className={cx('label')}>Username</div>
              <div className={cx('edit-area')}>
                <input type='text' defaultValue={`${user.first_name} ${user.last_name}`} placeholder='Username'></input>
                <p>www.tiktok.com/@{user.nickname}</p>
                <p>
                  Usernames can only contain letters, numbers, underscores, and periods. Changing your username will
                  also change your profile link.
                </p>
              </div>
            </div>
            <div className={cx('item-container')}>
              <div className={cx('label')}>Name</div>
              <div className={cx('edit-area')}>
                <input type='text' defaultValue={user.nickname} placeholder='Nickname'></input>
                <p>Your nickname can only be changed once every 7 days.</p>
              </div>
            </div>
            <div className={cx('item-container')}>
              <div className={cx('label')}>Bio</div>
              <div className={cx('edit-area')}>
                <textarea defaultValue={user.bio} placeholder='Bio'></textarea>
                <p>0/80</p>
              </div>
            </div>
          </div>
          <div className={cx('footer-container')}>
            <Button className={cx('btn-save')}>Save</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditProfile
