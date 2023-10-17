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

export default OnlyHeaderLayout
