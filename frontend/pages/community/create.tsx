import CommunityForm from '@/components/community/CommunityForm';
import SideBar from '@/components/community/SideBar';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const CreateCommunity = () => {
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
      <SideBar />
      <CommunityForm />
    </>
  );
};

export default CreateCommunity;
