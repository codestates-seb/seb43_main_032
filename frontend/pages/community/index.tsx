import Content from '@/components/community/Content';
import styled from 'styled-components';

const Community = () => {
  return (
    <Box>
      <Content />
    </Box>
  );
};

export default Community;

const Box = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 20px 10px;

  @media (max-width: 960px) {
    display: flex;
    flex-direction: column;
  }
`;
