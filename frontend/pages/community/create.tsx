import GridBox from '@/components/GridBox';
import PostAddPage from '@/components/community/CommunityForm';
import SideBar from '@/components/community/SideBar';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

//커뮤니티 글 작성 페이지 입니다. 경로 '/community/create/'
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
    <GridBox>
      <SideBar />
      <PostAddPage />
    </GridBox>
  );
};

export default CreateCommunity;
