import styled from 'styled-components';
import Contact from './Contact';

export const Modal = ({
  setIsModal,
}: {
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Container>
      <div>
        <Contact setIsModal={setIsModal} />
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
`;
