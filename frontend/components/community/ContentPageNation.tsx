import { api } from '@/util/api';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

export default function ContentPageNation() {
  const [pageNum, setPageNum] = useState([]);

  useEffect(() => {
    getPageNum();
  }, []);

  const getPageNum = async () => {
    await api.get('/posts').then((res) => {
      setPageNum(res.data.example);
      console.log(res.data.example);
    });
  };

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
