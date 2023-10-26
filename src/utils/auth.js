export const getAccessToken = () => localStorage.getItem('access_token') || ''

export const getProfile = () => {
  const result = localStorage.getItem('profile')
  return result ? JSON.parse(result) : null
}

export const saveIntoLocalStorage = (accessToken, profile) => {
  localStorage.setItem('access_token', accessToken)
  localStorage.setItem('profile', JSON.stringify(profile))
}

export const clearLocalStorage = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('profile')
}
