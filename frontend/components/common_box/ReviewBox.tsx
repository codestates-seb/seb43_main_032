import { Crew } from '@/types/project';
import styled from 'styled-components';
import { useAllData } from '@/hooks/react-query/useAllData';
import CrewItem from '../project/CrewItem';

type Props = {
  crewList: Crew[];
};

const ReviewBox = ({ crewList }: Props) => {
  const { userData } = useAllData();
  return (
    <Box>
      <div className="apply-list">
        <ul className="select-box">
          {crewList.map((crew) => (
            <CrewItem
              key={crew.memberId}
              userData={userData && userData}
              crew={crew}
            />
          ))}
        </ul>
      </div>
    </Box>
  );
};

export default ReviewBox;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  padding: var(--padding-2);
  justify-content: center;
  align-items: center;
  width: 100%;

  .apply-list {
    margin-top: 16px;
    width: 100%;
    height: 300px;
    display: flex;
    justify-content: center;
  }

  .select-box {
    overflow-y: scroll;
    overflow-x: hidden;
    position: relative;
    border: solid 2px #ececec;
    border-radius: var(--radius-def);
    display: flex;
    margin-bottom: 24px;
    padding: 0 20px;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: white;
    z-index: 2;
    padding: 16px 0px;
    gap: 24px;

    ::-webkit-scrollbar {
      width: 10px;
    }

    ::-webkit-scrollbar-thumb {
      height: 30%;
      background: #8217f3;

      border-radius: 10px;
    }

    ::-webkit-scrollbar-track {
      background: rgba(33, 122, 244, 0.1);
    }
  }
`;
