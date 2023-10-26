import http from '~/utils/http'

export const getVideoList = (type, page) =>
  http.get('videos', {
    params: {
      type,
      page
    }
  })
