import { ReactNode } from 'react';
import styled from 'styled-components';

interface IProps {
  keyNode: ReactNode;
  contentNode: ReactNode;
  lastItem?: Boolean;
}
export default function InfoContainer({ keyNode, contentNode }: IProps) {
  return (
    <Wrapper>
      <KeyContainer className="nnum-bold">{keyNode}</KeyContainer>
      <ContentContainer className="nnum-bold">{contentNode}</ContentContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 15px;
`;
const KeyContainer = styled.div`
  display: flex;
  flex-shrink: 0;
  width: 100px;
`;
const ContentContainer = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: column;
  justify-content: flex-start;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
`;
