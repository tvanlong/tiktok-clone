import PropTypes from 'prop-types'
import Header from '~/components/Header'

function OnlyHeaderLayout({ children }) {
  return (
    <div>
      <Header />
      <div className='container'>
        <div className='content'>{children}</div>
      </div>
    </div>
  )
}

OnlyHeaderLayout.propTypes = {
  children: PropTypes.node.isRequired
}

export default OnlyHeaderLayout
