import { ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Community } from '@/types/community';
import ContentItem from './ContentItem';
import { useRouter } from 'next/router';
import Pagenation from '../Pagenation';
import Filter from '../Filter';
import CommunityItemSkeleton from '../skeleton/CommunityItemSkeleton';
import { ARTICLE_FILTER, POST_COMMUNITY_CATEGORY } from '@/constant/constant';
import { communityFilter } from '@/util/filter/communityFilter';
import { useAllData } from '@/hooks/react-query/useAllData';
import Message from '../Message';

export default function Content() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const page_limit = 10;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [page]);

  //모든 데이터 세팅, 서버 필터링을 프론트 눈속임으로 해결
  const { communityData, communityLoading, communityError } = useAllData();
  const [allData, setAllData] = useState<Community[]>([]);
  useEffect(() => {
    if (communityData) setAllData(communityData);
  }, [communityLoading]);

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

  //카테고리 필터 데이터
  const CategoryFilterData = [
    '전체보기',
    ...Object.keys(POST_COMMUNITY_CATEGORY),
  ];
  const [categoryFilter, setCategoryFilter] = useState(0);
  const categoryFilterHandler = (idx: number) => {
    setCategoryFilter(idx);
  };

  //필터 데이터
  const filterData = communityFilter({
    filter,
    allData,
    searchVal,
    category: POST_COMMUNITY_CATEGORY[CategoryFilterData[categoryFilter]],
  });
  const pageSize = Math.ceil(filterData.length / 10);
  const viewData = filterData.slice((page - 1) * page_limit, page * page_limit);

  if (communityError) return <Message>잠시 후에 다시 시도해주세요.</Message>;
  return (
    <>
      <ContentTop>
        <SearchInput
          placeholder="검색어를 입력하세요."
          value={searchVal}
          onChange={findContentItem}
          onKeyPress={(e) => e.key === 'Enter'}
        />
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
        {communityLoading ? (
          <CommunityItemSkeleton width="90%" gap="20px" count={10} />
        ) : (
          <ContentItemList>
            {viewData.map((article: Community) => (
              <ContentItem {...article} key={article.articleId} />
            ))}
          </ContentItemList>
        )}
        <Pagenation page={page} onPageChange={setPage} pageSize={pageSize} />
      </ContentBottom>
    </>
  );
}

const ContentTop = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  padding-bottom: 0px;
  gap: 12px;
  div {
    transition: all 0.2s ease-in-out;
    background: #9b7aff;

    :hover {
      background: #8217f3;
    }
  }
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SearchInput = styled.input`
  width: 55%;
  border-radius: 4px;
  border: solid 2px #ececec;
  padding: 10px 22px;
  min-width: 240px;
  color: #5393fa;
  &:focus,
  :active {
    outline: none;
  }
  &::placeholder {
    color: #cfcfcf;
  }
`;

const SearchBtn = styled.button`
  border-radius: 4px;
  min-width: 104px;
  background: #9b7aff;
  padding: 10px 16px;
  color: #fff;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #8217f3;
  }
`;

const ContentBottom = styled.div`
  width: 100%;
  padding: var(--padding-2);
  background: #ffffff;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ContentItemList = styled.div`
  width: 100%;
  min-height: 80vh;
  border-radius: var(--radius-def);
  padding: 0px 20px;
  gap: 20px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  @media (max-width: 768px) {
    padding: 0px 10px;
  }
`;
