import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import ContentPageNation from './ContentPageNation';
import { Community } from '@/types/community';
import ContentItem from './ContentItem';
import { useQuery } from 'react-query';
import { api } from '@/util/api';
import { useRouter } from 'next/router';
import Message from '../Message';
import { useRecoilValue } from 'recoil';
import { checkState } from '@/recoil/atom';
import { COMMUNITY_FILTER } from '@/constant/constant';

export default function Content() {
  const router = useRouter();

  //같은 라우터간의 이동은 navigate의 형태로 페이지가 새롭게 만들어지지 않아 그 문제를 해결해주기 위해
  //check 상태를 만들어서 라우터간의 이동이 일어날 때, 리셋이 되도록 해줬음
  const check = useRecoilValue(checkState);
  useEffect(() => {
    setSearchVal('');
    setPage(1);
  }, [check]);

  // 주소값으로 데이터 필터링
  const urlSearch = new URLSearchParams(router.asPath).get('search');
  const urlPage = new URLSearchParams(router.asPath).get('page');
  const urlFilter = new URLSearchParams(router.asPath).get('filter');
  const [page, setPage] = useState(Number(urlPage) || 1);
  const [searchVal, setSearchVal] = useState(urlSearch || '');
  const [filter, setFilter] = useState(urlFilter || 'sorted');
  const { category } = router.query;

  const queryKey = category
    ? ['community', page, category]
    : ['community', page];

  const address = category ? `/community/${category}` : `/community`;

  // 데이터 불러오기
  const page_limit = 10;
  const { isLoading, error, data, refetch } = useQuery(queryKey, () =>
    api(
      `${address}?size=${page_limit}&page=${page}&search=${searchVal}&filter=${filter}`
    ).then((res) => res.data)
  );

  const findContentItem = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value);
  };

  const selectFilter = (filter: string) => {
    setFilter(filter);
  };

  const handleSearch = () => {
    refetch();
  };

  useEffect(() => {
    refetch();
  }, [filter]);

  const [isOpen, setIsOpen] = useState(false);

  const filterName = COMMUNITY_FILTER.find((x) => x.value === filter)?.label;

  if (isLoading) return <Message>로딩중입니다.</Message>;
  if (error) return <Message>잠시 후 다시 시도해주세요.</Message>;
  return (
    <Container>
      <ContentTop>
        <SearchInput
          placeholder="검색어를 입력하세요."
          value={searchVal}
          onChange={findContentItem}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <SearchBtn onClick={handleSearch}>
          <FaSearch />
        </SearchBtn>
        <SearchBtn onClick={() => router.push('/community')}>초기화</SearchBtn>
        <ContentBottomFilter onClick={() => setIsOpen(!isOpen)}>
          <CustomSelectButton>
            {filterName} <span className="icon">▼</span>
          </CustomSelectButton>
          <CustomSelectOptions isOpen={isOpen}>
            {COMMUNITY_FILTER.map((option) => (
              <CustomSelectOption
                key={option.value}
                onClick={() => selectFilter(option.value)}
              >
                {option.label}
              </CustomSelectOption>
            ))}
          </CustomSelectOptions>
        </ContentBottomFilter>
      </ContentTop>
      <ContentBottom>
        <ContentItemList>
          {data.data.map((article: Community) => (
            <ContentItem {...article} key={article.id} />
          ))}
          <ContentPageNation
            totalData={10}
            currentPage={page}
            setPage={setPage}
          />
        </ContentItemList>
      </ContentBottom>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  padding: var(--padding-2);
`;

const ContentTop = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  padding-bottom: 0px;
  gap: 12px;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
  }
`;

const SearchInput = styled.input`
  width: 55%;
  border-radius: 4px;
  border: solid 2px lightgray;
  padding: 10px 22px;
  min-width: 240px;
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
  min-width: 104px;
  background: #96bfff;
  padding: 10px 16px;
  color: #fff;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
  }
`;

const ContentBottom = styled.div`
  width: 100%;
  padding: var(--padding-2);
  background: #ffffff;
  border-radius: var(--radius-xl);
  position: relative;
  top: 20px;
`;

const ContentItemList = styled.div`
  width: 100%;
  border-radius: var(--radius-def);
  padding: var(--padding-2);
  padding-top: 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ContentBottomFilter = styled.div`
  min-width: 104px;
  display: flex;
  position: relative;
  display: inline-block;
  top: 0;
  font-size: 14px;
  z-index: 2;
  border-radius: 4px;
  background: #96bfff;
  padding: 10px 10px;
  outline: none;
  border: none;
  cursor: pointer;
`;

const CustomSelectButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  outline: none;
  background: none;
  color: white;
  cursor: pointer;
  font-size: 14px;
  border: none;
  .icon {
    margin-left: 5px;
  }
`;

type Props = {
  isOpen: boolean;
};

const CustomSelectOptions = styled.ul<Props>`
  position: absolute;
  top: calc(100% + 10px);
  left: 0;
  width: 100px;
  border-radius: 4px;
  list-style: none;
  margin: 0;
  padding: 0;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  opacity: ${(props) => (props.isOpen ? '1' : '0')};
  visibility: ${(props) => (props.isOpen ? 'visible' : 'hidden')};
  transform: ${(props) =>
    props.isOpen ? 'translateY(0)' : 'translateY(-10px)'};
  transition: all 0.3s ease-in-out;
`;

const CustomSelectOption = styled.li`
  width: 100%;
  height: 20px;
  padding: 0 8px;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`;
