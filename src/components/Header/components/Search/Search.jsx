import { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner, faMagnifyingGlass, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import Tippy from '@tippyjs/react/headless'
import AccountItem from '~/components/AccountItem'
import Wrapper from '~/components/Wrapper'
import classNames from 'classnames/bind'
import styles from './Search.module.scss'
import useDebounce from '~/hooks/useDebounce'

const cx = classNames.bind(styles)

function Search() {
  const [searchValue, setSearchValue] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const [showSearchResult, setShowSearchResult] = useState(true)
  const [loading, setLoading] = useState(false)
  const debounced = useDebounce(searchValue, 500) // Dùng để giảm số lần gọi API khi người dùng nhập vào ô search
  const inputRef = useRef(null)

  useEffect(() => {
    if (!debounced.trim()) {
      setSearchResult([])
      return
    }
    fetch(`https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(debounced)}&type=less`)
      .then((res) => res.json())
      .then((res) => {
        setSearchResult(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }, [debounced])

  const handleClear = () => {
    setSearchValue('')
    inputRef.current.focus()
  }

  const handleHideSearchResult = () => {
    setShowSearchResult(false)
  }

  return (
    <Tippy
      visible={showSearchResult && searchResult.length > 0}
      interactive={true}
      render={(attrs) => (
        <div className={cx('search-result')} tabIndex='-1' {...attrs}>
          <Wrapper>
            <h4 className={cx('search-title')}>Accounts</h4>
            {searchResult.map((result) => (
              <AccountItem key={result.id} data={result} />
            ))}
          </Wrapper>
        </div>
      )}
      onClickOutside={handleHideSearchResult}
    >
      <div className={cx('search')}>
        <input
          ref={inputRef}
          placeholder='Search'
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
        <button className={cx('search-btn')}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
    </Tippy>
  )
}

export default Search
