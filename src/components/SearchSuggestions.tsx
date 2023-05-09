import React from 'react'
import { BiSearch } from 'react-icons/bi'
import styled from 'styled-components'

import { Suggestion } from '../types/search'

interface SearchSuggestionsProps {
  suggestions: Suggestion[]
  focusIndex: number
  handleChangeKeyword: (
    e: React.MouseEvent<HTMLLIElement>,
    newKeyword: string
  ) => void
}

const SearchSuggestions = ({
  suggestions,
  focusIndex,
  handleChangeKeyword
}: SearchSuggestionsProps) => {
  return (
    <SearchSuggestionsLayout>
      <Title>추천 검색어</Title>
      {suggestions.length ? (
        <ul>
          {suggestions.map(({ id, name }, index) => (
            <SearchSuggestionsItem
              key={id}
              isFocused={focusIndex === index}
              onMouseDown={e => handleChangeKeyword(e, name)}
            >
              <SearchSuggestionsIcon />
              <p>{name}</p>
            </SearchSuggestionsItem>
          ))}
        </ul>
      ) : (
        <EmptyText>검색어 없음</EmptyText>
      )}
    </SearchSuggestionsLayout>
  )
}

const SearchSuggestionsLayout = styled.div`
  position: absolute;
  width: 100%;
  padding: 25px 0;
  margin: 10px 0 0 0;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
`

const SearchSuggestionsItem = styled.li<{ isFocused: boolean }>`
  display: flex;
  align-items: center;
  padding: 0 25px;
  background: ${({ isFocused }) => (isFocused ? 'rgba(0, 0, 0, 0.1)' : '#fff')};
  cursor: pointer;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }

  p {
    overflow: hidden;
    width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 2.5;
  }
`

const SearchSuggestionsIcon = styled(BiSearch).attrs({ size: 20 })`
  margin: 0 15px 0 0;
`

const Title = styled.p`
  font-size: 0.8rem;
  padding: 0 25px 12px;
`

const EmptyText = styled.p`
  padding: 0 0 0 25px;
`

export default SearchSuggestions
