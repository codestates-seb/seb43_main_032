import { api } from '@/util/api';
import React, { useState } from 'react';
import styled from 'styled-components';
import ContentItem from './ContentItem';
import ContentPageNation from './ContentPageNation';
import { useRecoilValue } from 'recoil';
import { searchState } from '@/recoil/atom';
import { useInfiniteQuery, useQueryClient } from 'react-query';
import { useRouter } from 'next/router';
import { Community } from '@/types/community';

export default function ContentItemList() {
  // 주솟값으로 데이터 필터링
  const [page, setPage] = useState<number>(1);
  const router = useRouter();
  const { id } = router.query;
  const queryKey = id ? ['posts', page, id] : ['posts', page];
  const queryClient = useQueryClient();

  const searchTitle = useRecoilValue(searchState);

  // 데이터 불러오기
  const page_limit = 10;
  const { isLoading, isError, data, hasNextPage, isFetching, refetch } =
    useInfiniteQuery(
      queryKey,
      async ({ pageParam = page }) => {
        const endpoint = id
          ? `/community/${id}?size=${page_limit}&page=${pageParam}&search=${searchTitle}`
          : `/community?size=${page_limit}&page=${pageParam}&search=${searchTitle}`;
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

  console.log(data);

  // useEffect(() => {
  //   refetch();
  //   // queryClient의 invalidateQueries를 사용하여 해당 query key를 무효화시킴
  //   queryClient.invalidateQueries(queryKey);
  // }, [searchTitle]);

  let filteredData;
  if (data) {
    filteredData = data;
  }

  const totalData: number = filteredData && filteredData.pages[0].total;

  return (
    <Container>
      {isLoading && !filteredData && <div>isLoading...</div>}
      {isError && <div>isError...</div>}
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
