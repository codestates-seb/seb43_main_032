import styled from 'styled-components';
import '../../styles/skill.css';

const Wrapper = styled.div``;
const StackWrapper = styled.div``;
export default function UserCard() {
  return (
    <Wrapper>
      crd
      <StackWrapper>
        <span className="bg-node" />
        <span className="bg-react" />
      </StackWrapper>
    </Wrapper>
  );
}
