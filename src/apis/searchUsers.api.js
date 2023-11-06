import http from '~/utils/http'

export const getSearchUsers = (q, type) =>
  http.get('users/search', {
    params: {
      q,
      type
    }
  })

export const getSearchUsersByPage = (params) =>
  http.get('users/search', {
    params
  })
