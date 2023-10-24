import http from '~/utils/http'

export const getSuggestedUsers = (page, per_page) =>
  http.get('users/suggested', {
    params: {
      page,
      per_page
    }
  })
