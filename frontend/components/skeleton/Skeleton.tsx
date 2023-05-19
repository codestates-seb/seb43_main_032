import styled from 'styled-components';
export type SkeletonProos = {
  width: number | string;
  height: number | string;
};

const Skeleton = (props: SkeletonProos) => <SkeletonContainer {...props} />;

const SkeletonContainer = styled.div<SkeletonProos>`
  height: ${({ height }) => height};
  width: ${({ width }) => width};
  border-radius: 5px;
  position: absolute;
  z-index: -1;
  overflow: hidden;
  transition: 0.5s;
  backdrop-filter: blur(1rem);
  border-radius: 5rem;

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

  &:after {
    content: '';
    position: absolute;
    top: -10rem;
    left: -100rem;
    width: 100%;
    height: 100%;
    animation: animStarRotate 90s linear infinite;
  }

  :after {
    background-image: radial-gradient(#ffffff 1px, transparent 1%);
    background-size: 50px 50px;
  }
  :before {
    content: '';
    position: absolute;
    top: 0;
    left: -50%;
    width: 170%;
    height: 500%;
    animation: animStar 60s linear infinite;
  }

  :before {
    background-image: radial-gradient(#ffffff 1px, transparent 1%);
    background-size: 50px 50px;
    opacity: 0.5;
  }

  @keyframes animStar {
    from {
      transform: translateY(0);
    }

    to {
      transform: translateY(-135rem);
    }
  }

  @keyframes animStarRotate {
    from {
      transform: rotate(360deg);
    }

    to {
      transform: rotate(0);
    }
  }
`;

export default Skeleton;
