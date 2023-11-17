import { useContext } from 'react'
import { AppContext } from '~/contexts/app.context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import Button from '~/components/Button'
import { useForm } from 'react-hook-form'
import { schemaLogin } from '~/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { loginAccount } from '~/apis/auth.api'
import { toast } from 'react-toastify'
import classNames from 'classnames/bind'
import styles from './ModalLogin.module.scss'

const cx = classNames.bind(styles)

function ModalLogin({ handleSwitchModal }) {
  const { showModal, setShowModal, toggleModal, setIsAuthenticated, setProfile } = useContext(AppContext)
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schemaLogin)
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
    loginAccountMutation.mutate(data, {
      onSuccess: (data) => {
        setShowModal(false)
        toast.success('Login successfully', {
          autoClose: 1000
        })
        setIsAuthenticated(true)
        setProfile(data.data.data)
      },
      onError: (err) => {
        if (err.response.status === 401) {
          toast.error('Email or password is incorrect', {
            autoClose: 1000
          })
        }
      }
    })
  })

  return (
    <>
      {showModal && (
        <div className={cx('modal')}>
          <div onClick={toggleModal} className={cx('overlay')}></div>
          {!loginAccountMutation.isPending ? (
            <div className={cx('modal-content')}>
              <form className={cx('modal-form')} onSubmit={onSubmit}>
                <h2 className={cx('title')}>Log In</h2>
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
                <button className={cx('close-modal')} onClick={toggleModal}>
                  <FontAwesomeIcon className={cx('icon')} icon={faTimes} />
                </button>
                <Button
                  type='submit'
                  disabled={loginAccountMutation.isPending}
                  primary
                  className={cx('btn-login-modal')}
                >
                  Log in
                </Button>
              </form>
              <div className={cx('text-signup')}>
                Don't have an account? <span onClick={handleSwitchModal}>Sign up</span>
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

export default ModalLogin
