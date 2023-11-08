import http from '~/utils/http'

export const registerAccount = (data) => http.post('auth/register', data)
export const loginAccount = (data) => http.post('auth/login', data)
export const logoutAccount = () => http.post('auth/logout')

export const getCurrentUser = () => http.get('auth/me')

export const followUser = (id) => http.post(`users/${id}/follow`)
export const unfollowUser = (id) => http.post(`users/${id}/unfollow`)

export const getProfile = (param) => http.get(`users/${param}`)
export const updateProfile = (data) => http.patch('auth/me', data)
