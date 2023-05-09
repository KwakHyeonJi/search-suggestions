import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { getSuggestions } from '../api/search'
import { CACHE_SUGGESTIONS, CACHE_DURATION } from '../constants/cache'
import useCache from '../hooks/useCache'
import useDebounce from '../hooks/useDebounce'
import useInput from '../hooks/useInput'
import useKeyboardMove from '../hooks/useKeyboardMove'
import { Suggestion } from '../types/search'

import SearchBar from './SearchBar'
import SearchSuggestions from './SearchSuggestions'

const MAX_SUGGESTIONS = 7

const Search = () => {
  const [keyword, setKeyword, handleChange] = useInput('')
  const debouncedKeyword = useDebounce<string>(keyword, 250)

  const suggestions = useCache<Suggestion[]>({
    initialData: [],
    name: CACHE_SUGGESTIONS,
    key: debouncedKeyword,
    duration: CACHE_DURATION,
    fetchData: getSuggestions
  })
  const renderedSuggestions = suggestions.slice(0, MAX_SUGGESTIONS)

  const [searchBarFocused, setSearchBarFocused] = useState(false)
  const [focusIndex, handleMoveFocus, resetFocus] = useKeyboardMove(
    renderedSuggestions.length,
    () => setKeyword(renderedSuggestions[focusIndex].name)
  )

  const handleChangeKeyword = (
    e: React.MouseEvent<HTMLLIElement>,
    newKeyword: string
  ) => {
    e.preventDefault()
    setKeyword(newKeyword)
  }

  useEffect(() => {
    resetFocus()
  }, [debouncedKeyword, searchBarFocused])

  return (
    <SearchLayout>
      <Title>
        국내 모든 임상시험 검색하고
        <br />
        온라인으로 참여하기
      </Title>
      <SearchSection>
        <SearchBar
          keyword={keyword}
          focused={searchBarFocused}
          handleChange={handleChange}
          handleMoveFocus={handleMoveFocus}
          handleFocus={() => setSearchBarFocused(true)}
          handleBlur={() => setSearchBarFocused(false)}
        />
        {searchBarFocused && (
          <SearchSuggestions
            suggestions={renderedSuggestions}
            focusIndex={focusIndex}
            handleChangeKeyword={handleChangeKeyword}
          />
        )}
      </SearchSection>
    </SearchLayout>
  )
}

const SearchLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding: 80px 0 160px 0;
  width: 100%;
  background: #cae9ff;
`

const SearchSection = styled.section`
  position: relative;
  width: 490px;
`

const Title = styled.h1`
  margin: 0 0 40px 0;
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.5;
  text-align: center;
`

export default Search
