import { api } from '@/util/api';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const getPageNum = async (
  setPageNum: React.Dispatch<React.SetStateAction<never[]>>
) => {
  await api.get('/post').then((res) => {
    setPageNum(res.data);
    console.log(res.data);
  });
};

export default function ContentPageNation() {
  const [pageNum, setPageNum] = useState([]);

  useEffect(() => {
    getPageNum(setPageNum);
  }, []);

  return (
    <Container>
      <PageContainer>
        {pageNum.map((el, idx) => (
          <div key={idx}>{idx}</div>
        ))}
      </PageContainer>
    </Container>
  );
  // pagenation 추가~
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PageContainer = styled.div`
  display: flex;
`;
