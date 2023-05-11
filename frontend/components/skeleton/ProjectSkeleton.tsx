import styled from 'styled-components';
import Skeleton from './Skeleton';

const ProjectSkeleton = () => {
  return (
    <Container>
      <div>
        <Skeleton width={'298px'} height={'317px'} />
      </div>
      <div>
        <Skeleton width={'298px'} height={'317px'} />
      </div>
      <div>
        <Skeleton width={'298px'} height={'317px'} />
      </div>
      <div>
        <Skeleton width={'298px'} height={'317px'} />
      </div>
    </Container>
  );
};

export default ProjectSkeleton;

const Container = styled.div`
  flex: 1;
  display: grid;
  gap: 16px;
  width: 100%;
  padding-top: 16px;
  grid-template-columns: repeat(4, 1fr);
  > div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @media (max-width: 1300px) {
    grid-template-columns: repeat(2, 1fr);
    > div:last-child {
      display: none;
    }
    > div:first-child {
      display: none;
    }
  }
  @media (max-width: 960px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-top: 0px;
    gap: 6px;
    > div {
      width: 100%;
      > div {
        width: 100%;
        height: 181px;
      }
    }
  }
`;
