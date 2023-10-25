import http from '~/utils/http'

export const registerAccount = (data) => http.post('auth/register', data)
export const loginAccount = (data) => http.post('auth/login', data)
