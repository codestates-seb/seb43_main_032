import { errorAlert } from '@/components/alert/Alert';
import CommunityForm from '@/components/community/CommunityForm';
import { getCookie } from '@/util/cookie';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

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
    <>
      <Head>
        <title>{`Side Quest - 커뮤니티 작성`}</title>
      </Head>
      <CommunityForm />;
    </>
  );
};

export default CreateCommunity;
