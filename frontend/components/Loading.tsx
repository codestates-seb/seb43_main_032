import styled from 'styled-components';

const Loading = () => <Box>로딩중입니다.</Box>;

export default Loading;

const Box = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 40px;
`;
