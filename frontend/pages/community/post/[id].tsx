import GridBox from '@/components/GridBox';
import PostAddPage from '@/components/community/PostAddPage';
import SideBar from '@/components/community/SideBar';

//커뮤니티 글 작성 페이지 입니다. 경로 '/community/create/'
const CommunityPostPage = () => {
  return (
    <GridBox>
      <SideBar />
      <PostAddPage />
    </GridBox>
  );
};

export default CommunityPostPage;
