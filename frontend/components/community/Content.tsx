import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import ContentBottomFilter from './ContentBottomFilter';
import ContentPageNation from './ContentPageNation';
import { Community } from '@/types/community';
import ContentItem from './ContentItem';
import { useQuery } from 'react-query';
import { api } from '@/util/api';
import { useRouter } from 'next/router';
import Message from '../Message';
import { useRecoilValue } from 'recoil';
import { checkState } from '@/recoil/atom';

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
  const [page, setPage] = useState(Number(urlPage) || 1);
  const [searchVal, setSearchVal] = useState(urlSearch || '');
  const { category } = router.query;

  const queryKey = category
    ? ['community', page, category]
    : ['community', page];

  const address = category ? `/community/${category}` : `/community`;

  // 데이터 불러오기
  const page_limit = 10;
  const { isLoading, error, data, refetch } = useQuery(queryKey, () =>
    api(`${address}?size=${page_limit}&page=${page}&search=${searchVal}`).then(
      (res) => res.data
    )
  );

  const findContentItem = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value);
  };

  const handleSearch = () => {
    refetch();
  };

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
        <ContentBottomFilter />
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
