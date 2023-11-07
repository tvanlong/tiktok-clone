import { Link, createSearchParams } from 'react-router-dom'
import classNames from 'classnames/bind'
import styles from './Pagination.module.scss'
import path from '~/constants/path'

const cx = classNames.bind(styles)

const RANGE = 2

function Pagination({ pageSize, queryConfig }) {
  const page = Number(queryConfig.page)
  const renderPagination = () => {
    let dotAfter = false
    let dotBefore = false
    const renderDotBefore = (index) => {
      if (!dotBefore) {
        dotBefore = true
        return <span key={index}>...</span>
      }
      return null
    }

    const renderDotAfter = (index) => {
      if (!dotAfter) {
        dotAfter = true
        return <span key={index}>...</span>
      }
      return null
    }

    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1

        if (page <= RANGE * 2 + 1 && pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
          return renderDotAfter(index)
        } else if (page > RANGE * 2 + 1 && page < pageSize - RANGE * 2) {
          if (pageNumber < page - RANGE && pageNumber > RANGE) {
            return renderDotBefore(index)
          } else if (pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
            return renderDotAfter(index)
          }
        } else if (page >= pageSize - RANGE * 2 && pageNumber > RANGE && pageNumber < page - RANGE) {
          return renderDotBefore(index)
        }

        return (
          <Link
            to={{
              pathname: path.search,
              search: createSearchParams({
                ...queryConfig,
                page: pageNumber.toString()
              }).toString()
            }}
            className={cx({ active: page === pageNumber })}
            key={index}
          >
            {pageNumber}
          </Link>
        )
      })
  }

  return (
    <div className={cx('pagination')}>
      {page === 1 ? (
        <Link className={cx('not-allowed')}>&laquo;</Link>
      ) : (
        <Link
          to={{
            pathname: path.search,
            search: createSearchParams({
              ...queryConfig,
              page: (page - 1).toString()
            }).toString()
          }}
        >
          &laquo;
        </Link>
      )}
      {renderPagination()}
      {page === pageSize ? (
        <Link className={cx('not-allowed')}>&raquo;</Link>
      ) : (
        <Link
          to={{
            pathname: path.search,
            search: createSearchParams({
              ...queryConfig,
              page: (page + 1).toString()
            }).toString()
          }}
        >
          &raquo;
        </Link>
      )}
    </div>
  )
}

export default Pagination
