// Access token LocalStorage
export const saveAccessToken = (accessToken) => {
  localStorage.setItem('access_token', accessToken)
}

export const removeAccessToken = () => {
  localStorage.removeItem('access_token')
}

export const getAccessToken = () => localStorage.getItem('access_token') || ''

// Profile LocalStorage (Current User)
export const saveProfile = (profile) => {
  localStorage.setItem('profile', JSON.stringify(profile))
}

export const getProfile = () => {
  const result = localStorage.getItem('profile')
  return result ? JSON.parse(result) : {}
}

export const removeProfile = () => {
  localStorage.removeItem('profile')
}
