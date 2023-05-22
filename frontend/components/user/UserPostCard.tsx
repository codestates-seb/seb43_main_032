import styled from 'styled-components';
import { AiTwotoneLike } from 'react-icons/ai';
import Stack from '../stack/Stack';
import { useRouter } from 'next/router';
import { formatDate } from '@/util/date';

const Wrapper = styled.div<{ filter: string }>`
  display: flex;
  padding: 10px;
  height: 120px;
  padding-left: 20px;
  margin-bottom: 20px;
  justify-content: space-between;
  align-items: center;
  border-radius: var(--radius-def);
  cursor: pointer;
  box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.25);
  -webkit-box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.25);
  border-left: 10px solid ${({ filter }) => filter};
`;
const Description = styled.span`
  margin-top: 10px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;
const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const CardInfo = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 10px;
`;

const StarRaiting = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 20px;
`;

export default function UserPostCard({ post }: { post: any }) {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/posts/${post.articleId}`);
  };
  return (
    <Wrapper onClick={handleClick} filter={setColorByCategory(post.category)}>
      <ContentContainer>
        <CardInfo>
          <h1 style={{ fontSize: '20px', fontWeight: 'bold' }}>{post.title}</h1>
          <span>{`${formatDate(new Date())}`}</span>
        </CardInfo>
        <Description>{post.content}</Description>
      </ContentContainer>
      <StarRaiting>
        <AiTwotoneLike size={30} style={{ color: '#6C82CA' }} />
        <p style={{ marginTop: '5px' }}>{post.totalLikes}</p>
      </StarRaiting>
    </Wrapper>
  );
}

function setColorByCategory(category: string) {
  switch (category) {
    case 'frontend':
      return '#2af599';
    case 'backend':
      return '#f98bfe';
    case 'uiux':
      return '#4512eb';
    default:
      return '#2af599';
  }
}
