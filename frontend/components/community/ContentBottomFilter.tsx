import { filterState } from '@/recoil/atom';
import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

// item 리스트 필터 버튼
export default function ContentBottomFilter() {
  const [selected, setSeleted] = useState<string>('검색 구분');
  const setFilterValue = useSetRecoilState(filterState);

  const optionChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSeleted(e.target.value);
    setFilterValue(e.target.value);
  };

  return (
    <Container>
      <label htmlFor="filter" className="nanum-regular">
        검색 옵션 :
      </label>
      <FilterBtn id="filter" value={selected} onChange={optionChange}>
        <option value="sorted">최신순</option>
        <option value="star">스크랩순</option>
        <option value="view">조회수순</option>
        <option value="comment">댓글순</option>
      </FilterBtn>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  width: 100%;
  height: 10%;
  padding: 10px;

  > label {
    margin-right: 0.3rem;
  }
`;

const FilterBtn = styled.select`
  width: 100px;
  height: 30px;
  margin-right: 20px;
  border-radius: var(--radius-def);
`;
