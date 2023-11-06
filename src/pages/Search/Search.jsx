import classNames from 'classnames/bind'
import styles from './Search.module.scss'
import { useQuery } from '@tanstack/react-query'
import { getSearchUsersByPage } from '~/apis/searchUsers.api'
import useQueryConfig from '~/hooks/useQueryConfig'
import { Link } from 'react-router-dom'

const cx = classNames.bind(styles)

function Search() {
  const queryConfig = useQueryConfig()
  const { data: accountsData } = useQuery({
    queryKey: ['accounts', queryConfig],
    queryFn: () => getSearchUsersByPage(queryConfig)
  })
  const accounts = accountsData?.data.data
  return (
    <div className={cx('container')}>
      <div className={cx('wrapper')}>
        <div className={cx('search-account')}>
          {accounts?.map((account) => (
            <Link to={`/@${account.nickname}`} key={account.id} className={cx('search-user')}>
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
          ))}
        </div>
      </div>
    </div>
  )
}

export default Search
