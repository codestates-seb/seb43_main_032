import { ReactNode } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  border-bottom: ${({ lastItem }: { lastItem: Boolean }) =>
    lastItem ? '' : '1px solid rgba(0, 0, 0, 0.3)'};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 20px;
`;
const Leftbox = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;
const KeyContainer = styled.div`
  width: 120px;
`;
const ContentContainer = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: column;
  justify-content: flex-start;
`;
const Button = styled.button`
  border: none;
  cursor: pointer;
  padding: 10px 20px;
  font-size: 20px;
  border-radius: 5px;
`;

export default function InfoContainer({
  keyNode,
  contentNode,
  lastItem = false,
}: {
  keyNode: ReactNode;
  contentNode: ReactNode;
  lastItem?: Boolean;
}) {
  return (
    <Wrapper lastItem={lastItem}>
      <Leftbox>
        <KeyContainer className="nanum-bold">{keyNode}</KeyContainer>
        <ContentContainer className="nanum-bold">
          {contentNode}
        </ContentContainer>
      </Leftbox>
      <Button>Edit</Button>
    </Wrapper>
  );
}
