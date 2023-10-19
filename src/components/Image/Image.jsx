import { forwardRef } from 'react'

const Image = forwardRef(({ ...props }, ref) => {
  // eslint-disable-next-line jsx-a11y/alt-text
  return <img ref={ref} {...props} />
})

export default Image
