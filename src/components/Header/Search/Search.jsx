import { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner, faMagnifyingGlass, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import Tippy from '@tippyjs/react/headless'
import AccountItem from '~/components/AccountItem'
import Wrapper from '~/components/Wrapper'
import classNames from 'classnames/bind'
import styles from './Search.module.scss'
import useDebounce from '~/hooks/useDebounce'
import { getSearchUsers } from '~/apis/searchUsers.api'
import { useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { createSearchParams, useNavigate } from 'react-router-dom'
import path from '~/constants/path'
import { useTranslation } from 'react-i18next'

const cx = classNames.bind(styles)

function Search() {
  const { t } = useTranslation(['header'])
  const [searchValue, setSearchValue] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const [showSearchResult, setShowSearchResult] = useState(true)
  const [loading, setLoading] = useState(false)
  const debouncedValue = useDebounce(searchValue, 500) // Dùng để giảm số lần gọi API khi người dùng nhập vào ô search
  const inputRef = useRef()
  const { handleSubmit, setValue } = useForm({
    defaultValues: {
      q: ''
    }
  })
  const navigate = useNavigate()

  // Fetch data với useQuery và axios
  const { data } = useQuery({
    queryKey: ['search', debouncedValue],
    queryFn: () => {
      setLoading(false)
      return getSearchUsers(debouncedValue, 'less')
    },
    enabled: !!debouncedValue.trim()
  })

  // Cập nhật searchResult khi data thay đổi
  useEffect(() => {
    if (data) {
      setSearchResult(data.data.data) // Cập nhật searchResult từ data
    } else {
      setSearchResult([]) // Gán searchResult là một mảng rỗng nếu data không tồn tại
    }
  }, [data])

  // Kiểm tra nếu người dùng đang nhập mà xóa hết ký tự thì set loading là false
  useEffect(() => {
    if (!debouncedValue.trim()) {
      setLoading(false)
    }
  }, [debouncedValue])

  useEffect(() => {
    if (searchValue) {
      setValue('q', searchValue)
    }
  }, [searchValue, setValue])

  const handleClear = () => {
    setSearchValue('')
    inputRef.current.focus()
  }

  const handleHideSearchResult = () => {
    setShowSearchResult(false)
  }

  const renderResult = (attrs) => (
    <div className={cx('search-result')} tabIndex='-1' {...attrs}>
      <Wrapper>
        <h4 className={cx('search-title')}>{t('Accounts')}</h4>
        {searchResult.map((result) => (
          <AccountItem key={result.id} data={result} />
        ))}
      </Wrapper>
    </div>
  )

  const onSubmit = handleSubmit((data) => {
    setSearchValue('')
    setShowSearchResult(false)
    inputRef.current.blur() // Tắt focus ô search
    navigate({
      pathname: path.search,
      search: createSearchParams({
        ...data,
        page: 1,
        type: 'more'
      }).toString() // Tạo query string từ object data
    })
  })

  return (
    <div>
      <Tippy
        visible={showSearchResult && searchResult.length > 0}
        interactive={true}
        render={renderResult}
        onClickOutside={handleHideSearchResult}
      >
        <form className={cx('search')} onSubmit={onSubmit}>
          <input
            ref={inputRef}
            placeholder={t('Search accounts')}
            spellCheck={false}
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value.trimStart())
              setLoading(true)
            }}
            onFocus={() => setShowSearchResult(true)}
          />
          {!!searchValue && !loading && (
            <button className={cx('clear')} onClick={handleClear}>
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
          )}
          {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
          <button type='submit' className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </form>
      </Tippy>
    </div>
  )
}

export default Search
