import { useContext } from 'react'
import { AppContext } from '~/contexts/app.context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import Button from '~/components/Button'
import { useForm } from 'react-hook-form'
import { schema } from '~/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { loginAccount, registerAccount } from '~/apis/auth.api'
import { omit } from 'lodash'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useGoogleLogin } from '@react-oauth/google'
import classNames from 'classnames/bind'
import styles from './ModalRegister.module.scss'

const cx = classNames.bind(styles)

function ModalRegister({ handleSwitchModal }) {
  const { showModal, setShowModal, toggleModal, setIsAuthenticated, setProfile } = useContext(AppContext)
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const registerAccountMutation = useMutation({
    mutationFn: (data) => registerAccount(data)
  })

  const loginAccountMutation = useMutation({
    mutationFn: (data) => loginAccount(data)
  })

  const handleClearError = (e) => {
    const { name } = e.target
    if (errors[name]) {
      clearErrors(name)
    }
  }

  const onSubmit = handleSubmit((data) => {
    const formData = omit(data, ['confirm_password'])
    const registerData = { type: 'email', ...formData }
    registerAccountMutation.mutate(registerData, {
      onSuccess: () => {
        handleSwitchModal()
        toast.success('Register successfully')
      },
      onError: (err) => {
        if (err.response.status === 409) {
          setError('email', {
            type: 'manual',
            message: 'Email already exists'
          })
        }
      }
    })
  })

  const signup = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      axios
        .get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`
          }
        })
        .then((res) => {
          // Đăng ký tài khoản thông qua google trước rồi mới đăng nhập
          const { email, sub } = res.data
          const registerData = {
            type: 'email',
            email,
            password: sub
          }
          registerAccountMutation.mutate(registerData, {
            onSuccess: () => {
              const loginData = omit(registerData, ['type'])
              loginAccountMutation.mutate(loginData, {
                onSuccess: (data) => {
                  setShowModal(false)
                  toast.success('Login successfully', {
                    autoClose: 1000
                  })
                  setIsAuthenticated(true)
                  setProfile(data.data.data)
                }
              })
            },
            onError: (err) => {}
          })
        })
    }
  })

  return (
    <>
      {showModal && (
        <div className={cx('modal')}>
          <div onClick={toggleModal} className={cx('overlay')}></div>
          {!registerAccountMutation.isPending ? (
            <div className={cx('modal-content')}>
              <form className={cx('modal-form')} onSubmit={onSubmit}>
                <h2 className={cx('title')}>Sign Up</h2>
                <div className={cx('text')}>Email</div>
                <div className={cx('input-wrapper')}>
                  <input
                    type='text'
                    placeholder='Email'
                    onChange={(event) => handleClearError(event)}
                    {...register('email')}
                  />
                  <div className={cx('err')}>{errors.email?.message}</div>
                </div>
                <div className={cx('input-wrapper')}>
                  <input type='password' placeholder='Password' {...register('password')} />
                  <div className={cx('err')}>{errors.password?.message}</div>
                </div>
                <div className={cx('input-wrapper')}>
                  <input type='password' placeholder='Confirm password' {...register('confirm_password')} />
                  <div className={cx('err')}>{errors.confirm_password?.message}</div>
                </div>
                <button className={cx('close-modal')} onClick={toggleModal}>
                  <FontAwesomeIcon className={cx('icon')} icon={faTimes} />
                </button>
                <Button
                  type='submit'
                  disabled={registerAccountMutation.isPending}
                  primary
                  className={cx('btn-login-modal')}
                >
                  Sign up
                </Button>
                <Button
                  type='button'
                  disabled={loginAccountMutation.isPending}
                  className={cx('btn-login-google')}
                  onClick={signup}
                >
                  Sign up with Google 🚀
                </Button>
              </form>
              <div className={cx('text-signup')}>
                Have an account? <span onClick={handleSwitchModal}>Log in</span>
              </div>
            </div>
          ) : (
            <div className={cx('loading')}>
              <div></div>
              <div></div>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default ModalRegister
