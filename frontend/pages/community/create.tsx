import CommunityForm from '@/components/community/CommunityForm';
import { getCookie } from '@/util/cookie';
import { useRouter } from 'next/router';

const CreateCommunity = () => {
  const router = useRouter();
  // if (!getCookie('accessToken')) {
  //   router.push('/404')
  // }
  return (
    <>
      <CommunityForm />
    </>
  );
};

export default CreateCommunity;
