import { ChangeEvent, useEffect, useState } from 'react';
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
import { ARTICLE_FILTER, POST_COMMUNITY_CATEGORY } from '@/constant/constant';
import { getAllCommunity } from '@/util/api/getAllProject';
import { articleFilter } from '@/util/filter/articleFilter';

export default function Content() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const page_limit = 10;
  const queryKey = ['articles', page];
  const endPoint = `/articles/find-all`;
  const address = `${endPoint}?size=${page_limit}&page=${page}`;
  const { communityQuery, refetch } = useCommunity<Community[]>({
    address,
    queryKey,
  });
  const data = communityQuery.data?.data;
  const totalPage = communityQuery.data?.pageInfo.totalPages;

  //모든 데이터 세팅, 서버 필터링을 프론트 눈속임으로 해결
  const [allData, setAllData] = useState<Community[]>([]);
  useEffect(() => {
    getAllCommunity().then((res) => setAllData(res));
  }, []);

  //검색
  const [searchVal, setSearchVal] = useState('');
  const findContentItem = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value);
  };

  //기존 필터
  const [filter, setFilter] = useState(0);
  const filterHandler = (idx: number) => {
    setFilter(idx);
  };
  useEffect(() => {
    if (filter !== 0) {
      setPage(1);
    }
  }, [filter]);
  //필터 데이터
  const filterData = articleFilter({ filter, allData, searchVal });

  //카테고리 필터 데이터
  const CategoryFilterData = [
    '전체보기',
    ...Object.keys(POST_COMMUNITY_CATEGORY),
  ];
  const [categoryFilter, setCategoryFilter] = useState(0);
  const categoryFilterHandler = (idx: number) => {
    setCategoryFilter(idx);
  };

  if (communityQuery.error)
    return <Message>잠시 후 다시 시도해주세요.</Message>;
  return (
    <Container>
      <ContentTop>
        <SearchInput
          placeholder="검색어를 입력하세요."
          value={searchVal}
          onChange={findContentItem}
          onKeyPress={(e) => e.key === 'Enter'}
        />
        <SearchBtn>
          <FaSearch />
        </SearchBtn>
        <SearchBtn onClick={() => router.push('/community/create')}>
          질문하기
        </SearchBtn>
        <Filter
          filterData={CategoryFilterData}
          filter={categoryFilter}
          selectFilter={categoryFilterHandler}
        />
        <Filter
          filterData={ARTICLE_FILTER}
          filter={filter}
          selectFilter={filterHandler}
        />
      </ContentTop>
      <ContentBottom>
        {communityQuery.isLoading ? (
          <CommunityItemSkeleton count={10} />
        ) : (
          <ContentItemList>
            {filterData
              ? (filterData as Community[])?.map((article: Community) => (
                  <ContentItem {...article} key={article.articleId} />
                ))
              : data?.map((article: Community) => (
                  <ContentItem {...article} key={article.articleId} />
                ))}
          </ContentItemList>
        )}
        <Pagenation
          page={page}
          onPageChange={setPage}
          pageSize={filterData ? Math.ceil(filterData.length / 10) : totalPage!}
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
    outline: solid 3px #c4c4c4;
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
