import GridBox from '@/components/GridBox';
import Content from '@/components/community/Content';
import PostPage from '@/components/community/PostPage';
import SideBar from '@/components/community/SideBar';

//프로젝트 조회 페이지 입니다. 경로 '/community/[id]'  예시 >> /community/3
const ViewCommunity = () => {
  return (
    <GridBox>
      <SideBar />
      <PostPage />
    </GridBox>
  );
};

export default ViewCommunity;
