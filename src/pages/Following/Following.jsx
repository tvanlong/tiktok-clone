import { useEffect, useState } from 'react'
import Button from '~/components/Button'
import classNames from 'classnames/bind'
import styles from './Following.module.scss'
import { useQuery } from '@tanstack/react-query'
import { getFollowingList } from '~/apis/followingList.api'

const cx = classNames.bind(styles)

const INIT_PAGE = 1

function Following() {
  const [followingUsers, setFollowingUsers] = useState([])
  const { data: followingUsersData, isLoading } = useQuery({
    queryKey: ['followingUsers'],
    queryFn: () => getFollowingList(INIT_PAGE)
  })

  useEffect(() => {
    if (followingUsersData) {
      setFollowingUsers(followingUsersData)
    }
  }, [followingUsersData])

  return (
    <div className={cx('layout')}>
      <div className={cx('container')}>
        {Array(10)
          .fill(0)
          .map((_, i) => (
            <div className={cx('user-card')} key={i}>
              <video
                poster={
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrNsQjVNuzaShuvqoC8Fa1HKdUE5FgS3IJ8w&usqp=CAU'
                }
                muted
                playsInline
                loop
              >
                <source
                  src={'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}
                  type='video/mp4'
                />
              </video>
              <div className={cx('user-info')}>
                <div className={cx('user-avatar')}>
                  <img src={'https://picsum.photos/200/300'} alt='avatar' />
                </div>
                <div className={cx('user-name')}>User Name</div>
                <div className={cx('nickname')}>nickname</div>
                <Button className={cx('follow-btn')}>Following</Button>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default Following
