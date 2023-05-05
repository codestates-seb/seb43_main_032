import styled from 'styled-components';

export type SkeletonProos = {
  width: number | string;
  height: number | string;
};

const Skeleton = (props: SkeletonProos) => <SkeletonContainer {...props} />;

const SkeletonContainer = styled.div<SkeletonProos>`
  position: relative;
  overflow: hidden;
  height: ${({ height }) => height};
  width: ${({ width }) => width};
  background-color: #f3f3f3;
  border-radius: 5px;

  @keyframes skeleton {
    0% {
      background-color: rgba(164, 164, 164, 0.1);
    }
    50% {
      background-color: rgba(164, 164, 164, 0.3);
    }
    100% {
      background-color: rgba(164, 164, 164, 0.1);
    }
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    animation: skeleton 1.6s infinite ease-in-out;
  }
`;

export default Skeleton;
