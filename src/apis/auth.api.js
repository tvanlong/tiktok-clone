import http from '~/utils/http'

// Login, Register, Logout
export const registerAccount = (data) => http.post('auth/register', data)
export const loginAccount = (data) => http.post('auth/login', data)
export const logoutAccount = () => http.post('auth/logout')

// Current User
export const getCurrentUser = () => http.get('auth/me')
export const followUser = (id) => http.post(`users/${id}/follow`)
export const unfollowUser = (id) => http.post(`users/${id}/unfollow`)
export const getProfile = (param) => http.get(`users/${param}`)
export const updateProfile = (data) =>
  http.post('auth/me?_method=PATCH', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

// React to Video
export const likeVideo = (id) => http.post(`videos/${id}/like`)
export const unlikeVideo = (id) => http.post(`videos/${id}/unlike`)

// Comment
export const getComments = (id) => http.get(`videos/${id}/comments`)
