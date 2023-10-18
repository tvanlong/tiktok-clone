import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import styles from './Button.module.scss'

const cx = classNames.bind(styles)

function Button({
  to,
  href,
  primary = false,
  outline = false,
  rounded = false,
  small = false,
  large = false,
  children,
  className,
  icon,
  onClick,
  ...props
}) {
  let Comp = 'button'
  const _props = {
    onClick,
    ...props
  }

  if (to) {
    _props.to = to
    Comp = Link
  } else if (href) {
    _props.href = href
    Comp = 'a'
  }

  const classes = cx('wrapper', {
    [className]: className,
    primary,
    outline,
    rounded,
    small,
    large
  })

  return (
    <Comp className={classes} {..._props}>
      {icon && <span className={cx('icon')}>{icon}</span>}
      <span className={cx('title')}>{children}</span>
    </Comp>
  )
}

export default Button
