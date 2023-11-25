import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getFollowingList } from '~/apis/followingList.api'
import classNames from 'classnames/bind'
import styles from './Following.module.scss'
import UserVideo from './components/UserVideo'
import Skeleton from 'react-loading-skeleton'

const cx = classNames.bind(styles)

const INIT_PAGE = 1

function Following() {
  const [followingUsers, setFollowingUsers] = useState([])
  const { data: followingUsersData, isFetched } = useQuery({
    queryKey: ['followingUsers'],
    queryFn: () => getFollowingList(INIT_PAGE)
  })

  useEffect(() => {
    if (followingUsersData) {
      setFollowingUsers(followingUsersData.data.data)
    }
  }, [followingUsersData])

  return (
    <div className={cx('layout')}>
      {isFetched ? (
        <div className={cx('container')}>
          {followingUsers.length > 0 && followingUsers.map((user) => <UserVideo key={user.id} user={user} />)}
        </div>
      ) : (
        <div className={cx('container')}>
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} height={305} borderRadius={8} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Following
