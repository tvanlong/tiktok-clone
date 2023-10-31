import http from '~/utils/http'

export const getFollowingList = (page) =>
  http.get('me/followings', {
    params: {
      page
    }
  })
