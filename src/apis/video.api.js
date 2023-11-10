import http from '~/utils/http'

export const getVideoList = (type, page) =>
  http.get('videos', {
    params: {
      type,
      page
    }
  })

export const getVideo = (uuid) => http.get(`videos/${uuid}`)

export const createNewVideo = (data) =>
  http.post('videos', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
