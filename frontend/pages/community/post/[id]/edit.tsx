import CommunityForm from '@/components/community/CommunityForm';
import { getCookie } from '@/util/cookie';
import { useRouter } from 'next/router';

const EditCommunity = () => {
  const router = useRouter();
  if (!getCookie('accessToken')) {
    alert('로그인을 부탁드려요.');
    router.push('/404');
  }
  return (
    <>
      <CommunityForm />
    </>
  );
};

export default EditCommunity;
