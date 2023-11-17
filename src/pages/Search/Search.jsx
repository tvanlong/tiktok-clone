import { useQuery } from '@tanstack/react-query'
import { getSearchUsersByPage } from '~/apis/searchUsers.api'
import useQueryConfig from '~/hooks/useQueryConfig'
import { Link } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { getProfile } from '~/apis/auth.api'
import Pagination from '~/components/Pagination'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import classNames from 'classnames/bind'
import styles from './Search.module.scss'

const cx = classNames.bind(styles)

function Search() {
  const queryClient = useQueryClient()
  const queryConfig = useQueryConfig()
  const { data: accountsData, isFetched } = useQuery({
    queryKey: ['accounts', queryConfig],
    queryFn: () => getSearchUsersByPage(queryConfig)
  })
  const accounts = accountsData?.data.data
  const handlePrefetchingUser = (nickname) => {
    queryClient.prefetchQuery({
      queryKey: ['user', nickname],
      queryFn: () => getProfile(nickname),
      staleTime: 1000 * 10 // Kiểm tra cache sau 10s khi hover vào account item
    })
  }
  return (
    <>
      <div className={cx('container')}>
        <div className={cx('wrapper')}>
          <div className={cx('search-account')}>
            {isFetched
              ? accounts?.map((account) => (
                  <Link
                    to={`/@${account.nickname}`}
                    key={account.id}
                    className={cx('search-user')}
                    onMouseEnter={() => handlePrefetchingUser(`@${account.nickname}`)}
                  >
                    <div className={cx('avatar')}>
                      <img
                        src={
                          account.avatar === 'https://files.fullstack.edu.vn/f8-tiktok/'
                            ? 'https://i.pinimg.com/736x/9a/63/e1/9a63e148aaff53532b045f6d1f09d762.jpg'
                            : account.avatar
                        }
                        alt={account.nickname}
                      />
                    </div>
                    <div className={cx('info')}>
                      <div className={cx('name')}>{account.full_name}</div>
                      <div className={cx('username')}>
                        {account.nickname} · <strong>{account.followers_count}</strong> Followers
                      </div>
                      <div className={cx('bio')}>{account.bio}</div>
                    </div>
                  </Link>
                ))
              : Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className={cx('search-user')}>
                    <div className={cx('avatar')}>
                      <Skeleton circle height={60} width={60} />
                    </div>
                    <div className={cx('info')}>
                      <div className={cx('name')}>
                        <Skeleton height={15} width={100} />
                      </div>
                      <div className={cx('username')}>
                        <Skeleton height={15} width={150} />
                      </div>
                      <div className={cx('bio')}>
                        <Skeleton height={15} width={200} />
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
      {isFetched && <Pagination queryConfig={queryConfig} pageSize={accountsData?.data.meta.pagination.total_pages} />}
    </>
  )
}

export default Search
