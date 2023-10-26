import PropTypes from 'prop-types'
import { forwardRef } from 'react'

const Image = forwardRef(({ ...props }, ref) => {
  const { alt, src } = props
  // eslint-disable-next-line jsx-a11y/alt-text
  return <img ref={ref} src={src} alt={alt} {...props} />
})

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired
}

export default Image
