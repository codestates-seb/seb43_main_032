import GridBox from '@/components/GridBox';
import PostAddPage from '@/components/community/PostAddPage';
import SideBar from '@/components/community/SideBar';
import { MinusTop } from '.';

//커뮤니티 글 작성 페이지 입니다. 경로 '/community/create/'
const CreateCommunity = () => {
  return (
    <MinusTop>
      <GridBox>
        <SideBar />
        <PostAddPage />
      </GridBox>
    </MinusTop>
  );
};

export default CreateCommunity;
