import { resetSearchState, searchState } from '@/recoil/atom';
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import ContentBottomFilter from './ContentBottomFilter';

// item 타이틀 검색어 기능
export default function ContentTop() {
  // 입력어 저장
  const [matchTitle, setMatchTitle] = useState('');

  // 입력어 전역 저장
  const saveSearchTitle = useSetRecoilState(searchState);
  const resetSearch = useSetRecoilState(resetSearchState);

  // 입력된 타이틀로 저장
  const findContentItem = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMatchTitle(e.target.value);
    console.log(e.target.value);
  };

  // 입력어 저장시키고 초기화
  const handleSearch = () => {
    saveSearchTitle(matchTitle);
    setMatchTitle('');
  };

  return (
    <Container>
      <SearchInput
        placeholder="검색어를 입력하세요."
        value={matchTitle}
        onChange={findContentItem}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
      />
      <SearchBtn
        onClick={() => {
          handleSearch(), resetSearch(true);
        }}
      >
        <FaSearch />
      </SearchBtn>
      <SearchBtn onClick={() => saveSearchTitle(null)}>초기화</SearchBtn>
      <ContentBottomFilter />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  padding-bottom: 0px;
`;

const SearchInput = styled.input`
  width: 65%;
  border-radius: 4px;
  border: solid 2px lightgray;
  margin-right: 16px;
  padding: 10px 22px;
  color: #5393fa;
  &:focus,
  :active {
    outline: none;
    border: solid 3px #c4c4c4;
  }
  &::placeholder {
    color: #cfcfcf;
  }
`;

const SearchBtn = styled.button`
  border-radius: 4px;
  background: #96bfff;
  padding: 10px 16px;
  color: #fff;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  margin-left: 12px;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
  }
`;
