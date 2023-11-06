import useQueryParams from '~/hooks/useQueryParams'

function useQueryConfig() {
  const queryParams = useQueryParams()
  const queryConfig = {
    q: queryParams.q,
    page: queryParams.page || 1,
    type: queryParams.type || 'more'
  }
  return queryConfig
}

export default useQueryConfig
