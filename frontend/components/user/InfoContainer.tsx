import { ReactNode } from 'react';
import styled from 'styled-components';

interface IProps {
  keyNode: ReactNode;
  contentNode: ReactNode;
  lastItem?: Boolean;
}
export default function InfoContainer({
  keyNode,
  contentNode,
}: IProps) {
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
  width: 100px;
`;
const ContentContainer = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: column;
  justify-content: flex-start;
`;
