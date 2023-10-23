import PropTypes from 'prop-types'
import { forwardRef } from 'react'

const Image = forwardRef(({ ...props }, ref) => {
  // eslint-disable-next-line jsx-a11y/alt-text
  return <img ref={ref} {...props} />
})

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired
}

export default Image
