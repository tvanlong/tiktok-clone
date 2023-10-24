import http from '~/utils/http'

export const getSearchUsers = (q, type) =>
  http.get('users/search', {
    params: {
      q,
      type
    }
  })
