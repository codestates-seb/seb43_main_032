import ViewCommunity from '@/components/community/ViewCommunity';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

//커뮤니티 글 작성 페이지 입니다. 경로 '/community/create/'
const CommunityPostPage = () => {
  const router = useRouter();
  useEffect(() => {
    window.scrollTo({
      top: 600,
      left: 0,
      behavior: 'smooth',
    });
  }, [router]);
  return <ViewCommunity />;
};

export default CommunityPostPage;
