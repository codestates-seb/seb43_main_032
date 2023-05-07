import GridBox from '@/components/GridBox';
import PostAddPage from '@/components/community/PostAddPage';
import SideBar from '@/components/community/SideBar';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { MinusTop } from '..';

//커뮤니티 글 작성 페이지 입니다. 경로 '/community/create/'
const CommunityPostPage = () => {
  const router = useRouter();
  const idNum = router.query.id;

  return (
    <MinusTop>
      <GridBox>
        <SideBar />
        <TextSize>{idNum}</TextSize>
      </GridBox>
    </MinusTop>
  );
};

const TextSize = styled.div`
  font-size: 50px;
`;

export default CommunityPostPage;
