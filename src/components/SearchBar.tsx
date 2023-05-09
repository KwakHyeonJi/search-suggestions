import React from 'react'
import { BiSearch } from 'react-icons/bi'
import styled from 'styled-components'

import { blindStyle } from '../styles/common'

interface SearchBarProps {
  keyword: string
  focused: boolean
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleMoveFocus: (e: React.KeyboardEvent<HTMLInputElement>) => void
  handleFocus: () => void
  handleBlur: () => void
}

const SearchBar = ({
  keyword,
  focused,
  handleChange,
  handleMoveFocus,
  handleFocus,
  handleBlur
}: SearchBarProps) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <SearchBarLayout onSubmit={handleSubmit} focused={focused}>
      <SearchBarIcon size={20} />
      <SearchBarLabel htmlFor="search">검색어</SearchBarLabel>
      <SearchBarInput
        type="text"
        id="search"
        value={keyword}
        onChange={handleChange}
        onKeyDown={handleMoveFocus}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="질환명을 입력해 주세요."
      />
      <SearchBarButton type="submit">
        <BiSearch size={30} />
      </SearchBarButton>
    </SearchBarLayout>
  )
}

const SearchBarLayout = styled.form<{ focused: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  height: 70px;
  outline: ${({ focused }) => (focused ? '2px solid #007be9' : 'none')};
  border-radius: 50px;
  background: #fff;
`

const SearchBarIcon = styled(BiSearch)`
  margin: 0 15px 0 25px;
`

const SearchBarLabel = styled.label`
  ${blindStyle}
`

const SearchBarInput = styled.input`
  flex: 1;
  font-size: 1.2rem;
`

const SearchBarButton = styled.button`
  width: 50px;
  height: 50px;
  margin: 0 10px;
  border-radius: 50%;
  background: #007be9;
  color: #fff;
`

export default SearchBar
