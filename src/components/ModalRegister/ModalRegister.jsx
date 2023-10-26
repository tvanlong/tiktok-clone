import { useContext } from 'react'
import { AppContext } from '~/contexts/app.context'
import classNames from 'classnames/bind'
import styles from './ModalRegister.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import Button from '~/components/Button'
import { useForm } from 'react-hook-form'
import { schema } from '~/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { registerAccount } from '~/apis/auth.api'
import { omit } from 'lodash'
import { toast } from 'react-toastify'

const cx = classNames.bind(styles)

function ModalRegister({ handleSwitchModal }) {
  const { showModal, toggleModal } = useContext(AppContext)
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
      onSuccess: (res) => {
        console.log(res)
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

  return (
    <>
      {showModal && (
        <div className={cx('modal')}>
          <div onClick={toggleModal} className={cx('overlay')}></div>
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
            </form>
            <div className={cx('text-signup')}>
              Have an account? <span onClick={handleSwitchModal}>Log in</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ModalRegister
