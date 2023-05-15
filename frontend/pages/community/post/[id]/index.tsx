import ViewCommunity from '@/components/community/ViewCommunity';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

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
