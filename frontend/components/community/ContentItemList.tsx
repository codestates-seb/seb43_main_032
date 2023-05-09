import { api } from '@/util/api';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ContentItem from './ContentItem';
import ContentPageNation from './ContentPageNation';
import { useRecoilState, useRecoilValue } from 'recoil';
import { resetSearchState, searchState } from '@/recoil/atom';
import { useInfiniteQuery, useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { Article } from '@/types/types';

export default function ContentItemList() {
  // 주솟값으로 데이터 필터링
  const [page, setPage] = useState<number>(1);
  const router = useRouter();
  console.log(router.query);

  // 데이터 불러오기
  const page_limit = 10;
  const { isLoading, isError, data, hasNextPage, isFetching } =
    useInfiniteQuery(
      ['posts', page],
      ({ pageParam = page }) =>
        api(`/community?size=${page_limit}&page=${pageParam}`).then(
          (res) => res.data
        ),
      {
        getNextPageParam: (lastPage, allPages) => {
          if (lastPage.data.length < page_limit) {
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
  // querykey [post, filter] 등

  return (
    <Container>
      {isLoading && <div>isLoading...</div>}
      {isError && <div>isError...</div>}
      {filteredData &&
        filteredData.pages.map((page, idx: number) =>
          page.data.map((article: Article) => (
            <ContentItem {...article} key={article.id} />
          ))
        )}
      <ContentPageNation
        totalData={totalData}
        currentPage={page}
        setPage={setPage}
      />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  border-radius: var(--radius-def);
  padding: var(--padding-2);
  padding-top: 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
