import React, { useState } from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import ContentBottomFilter from './ContentBottomFilter';
import ContentPageNation from './ContentPageNation';
import { Community } from '@/types/community';
import ContentItem from './ContentItem';
import { useInfiniteQuery } from 'react-query';
import { api } from '@/util/api';
import { useRouter } from 'next/router';
import Message from '../Message';

export default function Content() {
  const router = useRouter();
  const [searchVal, setSearchVal] = useState('');

  const findContentItem = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value);
  };

  const handleSearch = () => {
    router.push('/community');
  };

  // 주솟값으로 데이터 필터링
  const pageNum = new URLSearchParams(router.asPath).get('page');
  const [page, setPage] = useState(Number(pageNum) || 1);
  const { category } = router.query;
  const queryKey = category ? ['posts', page, category] : ['posts', page];

  // 데이터 불러오기
  const page_limit = 10;
  const { isLoading, error, data } = useInfiniteQuery(
    queryKey,
    async ({ pageParam = page }) => {
      const endpoint = category
        ? `/community/${category}?size=${page_limit}&page=${pageParam}&search=${searchVal}`
        : `/community?size=${page_limit}&page=${pageParam}&search=${searchVal}`;
      return await api(endpoint).then((res) => res.data);
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        if (!lastPage.data || lastPage.data.length < page_limit) {
          return null;
        }
        return allPages.length + 1;
      },
    }
  );

  let filteredData;
  if (data) {
    filteredData = data;
  }

  const totalData: number = filteredData && filteredData.pages[0].total;
  if (isLoading) return <Message>로딩중입니다.</Message>;
  if (error) return <Message>잠시 후 다시 시도해주세요.</Message>;
  return (
    <Container>
      <ContentTop>
        <SearchInput
          placeholder="검색어를 입력하세요."
          value={searchVal}
          onChange={findContentItem}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
        />
        <SearchBtn onClick={handleSearch}>
          <FaSearch />
        </SearchBtn>
        <SearchBtn onClick={() => router.push('/community')}>초기화</SearchBtn>
        <ContentBottomFilter />
      </ContentTop>
      <ContentBottom>
        <ContentItemList>
          {filteredData &&
            filteredData.pages.map((page) =>
              page.data.map((article: Community) => (
                <ContentItem {...article} key={article.id} />
              ))
            )}
          <ContentPageNation
            totalData={totalData}
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
