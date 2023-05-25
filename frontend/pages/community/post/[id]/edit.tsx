import { errorAlert } from '@/components/alert/Alert';
import CommunityForm from '@/components/community/CommunityForm';
import { getCookie } from '@/util/cookie';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const EditCommunity = () => {
  const router = useRouter();
  useEffect(() => {
    if (!getCookie('accessToken')) {
      router
        .push('/404')
        .then(() => errorAlert('로그인을 부탁드려요.', '로그인'));
    }
  }, []);
  return <CommunityForm />;
};

export default EditCommunity;
