import { useContext, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { AppContext } from '~/contexts/app.context'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Image from '~/components/Image'
import { EditAvatar } from '~/constants/icons'
import Button from '~/components/Button'
import { userSchema } from '~/utils/rules'
import { getCurrentUser, updateProfile } from '~/apis/auth.api'
import { getProfile as getProfileFromLS } from '~/utils/auth'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames/bind'
import styles from './EditProfile.module.scss'

const cx = classNames.bind(styles)

function EditProfile() {
  const { t } = useTranslation(['editProfile'])
  const { setProfile } = useContext(AppContext)
  const [count, setCount] = useState(0)
  const [file, setFile] = useState()
  const [avatarUrl, setAvatarUrl] = useState('')
  const { data: userData, refetch } = useQuery({
    queryKey: ['user'],
    queryFn: () => getCurrentUser(getProfileFromLS().nickname)
  })
  const user = userData?.data.data
  const updateProfileMutation = useMutation({
    mutationFn: (data) => updateProfile(data)
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    defaultValues: {
      avatar: '',
      first_name: '',
      last_name: '',
      nickname: '',
      bio: ''
    },
    resolver: yupResolver(userSchema)
  })

  useEffect(() => {
    if (user) {
      setValue('avatar', user.avatar)
      setValue('first_name', user.first_name)
      setValue('last_name', user.last_name)
      setValue('nickname', user.nickname)
      setValue('bio', user.bio)
      setCount(user.bio.length)
    }
  }, [setValue, user])

  const onSubmit = handleSubmit(async (data) => {
    // Kiểm tra nếu không thay đổi gì rồi ấn save thì không gọi api
    if (
      data.avatar === user.avatar &&
      data.first_name === user.first_name &&
      data.last_name === user.last_name &&
      data.nickname === user.nickname &&
      data.bio === user.bio
    ) {
      return
    } else if (data.avatar === user.avatar) {
      // Kiểm tra nếu không thay đổi avatar thì gọi api
      const form = new FormData()
      form.append('first_name', data.first_name)
      form.append('last_name', data.last_name)
      form.append('nickname', data.nickname)
      form.append('bio', data.bio)
      const res = await updateProfileMutation.mutateAsync(form)
      setProfile(res.data.data)
      localStorage.setItem('profile', JSON.stringify(res.data.data))
      refetch()
      toast.success('Your profile is updated', {
        autoClose: 1000,
        theme: 'colored'
      })
    } else {
      // Kiểm tra nếu có thay đổi thì gọi api
      const form = new FormData()
      form.append('avatar', file)
      form.append('first_name', data.first_name)
      form.append('last_name', data.last_name)
      form.append('nickname', data.nickname)
      form.append('bio', data.bio)
      const res = await updateProfileMutation.mutateAsync(form)
      setProfile(res.data.data)
      localStorage.setItem('profile', JSON.stringify(res.data.data))
      refetch()
      toast.success('Your profile is updated', {
        autoClose: 1000,
        theme: 'colored'
      })
    }
  })

  const handleLimitTextarea = (e) => {
    const value = e.target.value
    setCount(value.length)
    if (value.length > 80) {
      toast.error('Bio must be less than 80 characters', {
        autoClose: 1000,
        position: 'top-center',
        theme: 'colored'
      })
    }
  }

  const handleChangeFile = (e) => {
    const file = e.target.files[0]
    setFile(file)

    const reader = new FileReader()
    reader.onloadend = () => {
      setAvatarUrl(reader.result)
    }
    if (file) {
      reader.readAsDataURL(file)
    }
  }

  if (updateProfileMutation.isPending)
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
    <div className={cx('wrapper')}>
      <form className={cx('content')} onSubmit={onSubmit}>
        <div className={cx('edit-container')}>
          <div className={cx('header-container')}>
            <h1 className={cx('header-title')}>{t('Edit profile')}</h1>
          </div>
          <div className={cx('content-container')}>
            <div className={cx('item-container')}>
              <div className={cx('label')}>{t('Profile photo')}</div>
              <div className={cx('avatar-content')}>
                <div className={cx('avatar')}>
                  <Image src={avatarUrl || user?.avatar} alt={user?.nickname} />
                </div>
                <div className={cx('avatar-edit')}>
                  <EditAvatar />
                  <input
                    type='file'
                    accept='image/*'
                    {...register('avatar')}
                    className={cx('avatar-edit-input')}
                    onChange={handleChangeFile}
                  ></input>
                </div>
              </div>
            </div>
            <div className={cx('item-container')}>
              <div className={cx('label')}>User Name</div>
              <div className={cx('edit-area')}>
                <input type='text' placeholder='First Name' {...register('first_name')}></input>
                <div className={cx('err')}>{errors.first_name?.message}</div>
                <input type='text' placeholder='Last Name' {...register('last_name')}></input>
                <div className={cx('err')}>{errors.last_name?.message}</div>
                <p>www.tiktok.com/@{user?.nickname}</p>
                <p>{t('username desc')}</p>
              </div>
            </div>
            <div className={cx('item-container')}>
              <div className={cx('label')}>{t('Nick Name')}</div>
              <div className={cx('edit-area')}>
                <input disabled type='text' placeholder={t('Nick Name')} {...register('nickname')}></input>
                <div className={cx('err')}>{errors.nickname?.message}</div>
                <p>{t('nickname desc')}</p>
              </div>
            </div>
            <div className={cx('item-container')}>
              <div className={cx('label')}>{t('Bio')}</div>
              <div className={cx('edit-area')}>
                <textarea
                  defaultValue={user?.bio}
                  placeholder='Bio'
                  {...register('bio')}
                  onChange={handleLimitTextarea}
                ></textarea>
                <div className={cx('err')}>{errors.bio?.message}</div>
                <p>{count}/80</p>
              </div>
            </div>
          </div>
          <div className={cx('footer-container')}>
            <Button className={cx('btn-save')}>{t('Save')}</Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default EditProfile
