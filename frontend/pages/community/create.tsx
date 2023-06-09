import { errorAlert } from '@/components/alert/Alert';
import CommunityForm from '@/components/community/CommunityForm';
import { getCookie } from '@/util/cookie';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import styled from 'styled-components';

const CreateCommunity = () => {
  const router = useRouter();
  useEffect(() => {
    if (!getCookie('accessToken')) {
      router
        .push('/404')
        .then(() => errorAlert('로그인을 부탁드려요.', '로그인'));
    }
  }, []);
  return (
    <Container>
      <Head>
        <title>{`SIDE QUEST - 커뮤니티 작성`}</title>
      </Head>
      <CommunityForm />;
    </Container>
  );
};

export default CreateCommunity;

const Container = styled.div`
  padding-top: 80px;
`;
