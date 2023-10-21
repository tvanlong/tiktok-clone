import { http } from '~/utils/http'

export const getUser = (q, type) =>
  http.get('users/search', {
    params: {
      q,
      type
    }
  })
