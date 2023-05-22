import CommunityForm from '@/components/community/CommunityForm';
import { getCookie } from '@/util/cookie';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const CreateCommunity = () => {
  const router = useRouter();
  useEffect(() => {
    if (!getCookie('accessToken')) {
      router.push('/404').then(() => alert('로그인을 부탁드려요.'));
    }
  }, []);
  return (
    <>
      <CommunityForm />
    </>
  );
};

export default CreateCommunity;
