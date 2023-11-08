import classNames from 'classnames/bind'
import styles from './EditProfile.module.scss'
import Image from '~/components/Image'
import { EditAvatar } from '~/constants/icons'
import Button from '~/components/Button'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { userSchema } from '~/utils/rules'
import { useContext, useEffect } from 'react'
import { getCurrentUser, updateProfile } from '~/apis/auth.api'
import { getProfile as getProfileFromLS } from '~/utils/auth'
import { AppContext } from '~/contexts/app.context'
import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'

const cx = classNames.bind(styles)

function EditProfile() {
  const { setProfile } = useContext(AppContext)
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
      first_name: '',
      last_name: '',
      nickname: '',
      bio: ''
    },
    resolver: yupResolver(userSchema)
  })

  useEffect(() => {
    if (user) {
      setValue('first_name', user.first_name)
      setValue('last_name', user.last_name)
      setValue('nickname', user.nickname)
      setValue('bio', user.bio)
    }
  }, [setValue, user])

  const onSubmit = handleSubmit(async (data) => {
    const form = new FormData()
    const addToFormData = ['first_name', 'last_name', 'nickname', 'bio']
    addToFormData.forEach((key) => {
      form.append(key, data[key])
    })
    const res = await updateProfileMutation.mutateAsync(form)
    setProfile(res.data.data)
    localStorage.setItem('profile', JSON.stringify(res.data.data))
    refetch()
    toast.success('Your profile is updated', {
      autoClose: 2000,
      theme: 'colored'
    })
  })

  return (
    <div className={cx('wrapper')}>
      <div className={cx('content')}>
        <form className={cx('edit-container')} onSubmit={onSubmit}>
          <div className={cx('header-container')}>
            <h1 className={cx('header-title')}>Edit Profile</h1>
          </div>
          <div className={cx('content-container')}>
            <div className={cx('item-container')}>
              <div className={cx('label')}>Profile photo</div>
              <div className={cx('avatar-content')}>
                <div className={cx('avatar')}>
                  <Image src={user?.avatar} alt={user?.nickname} />
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
              <div className={cx('label')}>User Name</div>
              <div className={cx('edit-area')}>
                <input type='text' placeholder='First Name' {...register('first_name')}></input>
                <div className={cx('err')}>{errors.first_name?.message}</div>
                <input type='text' placeholder='Last Name' {...register('last_name')}></input>
                <div className={cx('err')}>{errors.last_name?.message}</div>
                <p>www.tiktok.com/@{user?.nickname}</p>
                <p>
                  Usernames can only contain letters, numbers, underscores, and periods. Changing your username will
                  also change your profile link.
                </p>
              </div>
            </div>
            <div className={cx('item-container')}>
              <div className={cx('label')}>Nick Name</div>
              <div className={cx('edit-area')}>
                <input type='text' placeholder='Nickname' {...register('nickname')}></input>
                <div className={cx('err')}>{errors.nickname?.message}</div>
                <p>Your nickname can only be changed once every 7 days.</p>
              </div>
            </div>
            <div className={cx('item-container')}>
              <div className={cx('label')}>Bio</div>
              <div className={cx('edit-area')}>
                <textarea defaultValue={user?.bio} placeholder='Bio' {...register('bio')}></textarea>
                <div className={cx('err')}>{errors.bio?.message}</div>
                <p>0/80</p>
              </div>
            </div>
          </div>
          <div className={cx('footer-container')}>
            <Button className={cx('btn-save')}>Save</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditProfile
