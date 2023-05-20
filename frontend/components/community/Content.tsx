import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import { Community } from '@/types/community';
import ContentItem from './ContentItem';
import { useRouter } from 'next/router';
import Pagenation from '../Pagenation';
import { useCommunity } from '@/hooks/react-query/community/useCommunity';
import Filter from '../Filter';
import Message from '../Message';
import CommunityItemSkeleton from '../skeleton/CommunityItemSkeleton';

export default function Content() {
  const router = useRouter();

  useEffect(() => {
    setSearchVal('');
    setPage(1);
  }, [router]);

  // 주소값으로 데이터 필터링
  const urlSearch = new URLSearchParams(router.asPath).get('search');
  const urlPage = new URLSearchParams(router.asPath).get('page');
  const urlFilter = new URLSearchParams(router.asPath).get('filter');
  const [page, setPage] = useState(Number(urlPage) || 1);
  const [searchVal, setSearchVal] = useState(urlSearch || '');
  const [filter, setFilter] = useState(urlFilter || 'sorted');
  const { category } = router.query;
  const page_limit = 10;

  const endPoint = category
    ? `/articles/find-all/${category}`
    : `/articles/find-all`;
  const address = `${endPoint}?size=${page_limit}&page=${page}&search=${searchVal}&filter=${filter}`;
  const queryKey = category ? ['articles', page, category] : ['articles', page];

  const { communityQuery, refetch } = useCommunity<Community[]>({
    address,
    queryKey,
  });
  const data = communityQuery.data?.data;
  const totalPage = communityQuery.data?.pageInfo.totalPages;

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

  if (communityQuery.error)
    return <Message>잠시 후 다시 시도해주세요.</Message>;
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
        <Filter filter={filter} selectFilter={selectFilter} />
      </ContentTop>
      <ContentBottom>
        {communityQuery.isLoading ? (
          <CommunityItemSkeleton count={10} />
        ) : (
          <ContentItemList>
            {data?.map((article: Community) => (
              <ContentItem {...article} key={article.articleId} />
            ))}
          </ContentItemList>
        )}
        <Pagenation
          page={page}
          onPageChange={setPage}
          pageSize={totalPage ? totalPage : 1}
        />
      </ContentBottom>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  padding: var(--padding-2);
  padding-top: 0;
`;

const ContentTop = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
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
  min-height: 74vh;
  border-radius: var(--radius-def);
  padding: var(--padding-2);
  padding-top: 0px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;
