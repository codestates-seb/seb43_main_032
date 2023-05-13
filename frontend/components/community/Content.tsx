import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import { Community } from '@/types/community';
import ContentItem from './ContentItem';
import { useRouter } from 'next/router';
import Message from '../Message';
import { COMMUNITY_FILTER } from '@/constant/constant';
import Pagenation from '../Pagenation';
import { useCommunity } from '@/hooks/react-query/useCommunity';

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
  const endPoint = category ? `/community/${category}` : `/community`;
  const address = `${endPoint}?size=${page_limit}&page=${page}&search=${searchVal}&filter=${filter}`;
  const queryKey = category
    ? ['community', page, category]
    : ['community', page];

  const { communityQuery, refetch } = useCommunity<Community[]>({
    address,
    queryKey,
  });

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

  if (communityQuery.isLoading) return <Message>로딩중입니다.</Message>;
  if (communityQuery.error)
    return <Message>잠시 후 다시 시도해주세요.</Message>;
  return (
    <Container>
      {communityQuery.data && (
        <>
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
            <SearchBtn onClick={() => router.push('/community')}>
              초기화
            </SearchBtn>
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
              {communityQuery.data?.data?.map((article: Community) => (
                <ContentItem {...article} key={article.id} />
              ))}
            </ContentItemList>
            <Pagenation
              page={page}
              onPageChange={setPage}
              pageSize={Math.ceil(communityQuery.data?.total! / 10)}
            />
          </ContentBottom>
        </>
      )}
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
  min-height: 74vh;
  border-radius: var(--radius-def);
  padding: var(--padding-2);
  padding-top: 0px;
  display: flex;
  flex-direction: column;
  justify-content: start;
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
