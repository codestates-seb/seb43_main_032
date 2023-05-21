import CommunityForm from '@/components/community/CommunityForm';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const EditCommunity = () => {
  const router = useRouter();
  useEffect(() => {
    window.scrollTo({
      top: 600,
      left: 0,
      behavior: 'smooth',
    });
  }, [router]);
  return (
    <>
      <CommunityForm />
    </>
  );
};

export default EditCommunity;
