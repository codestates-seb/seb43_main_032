import styled from 'styled-components';
import { ReactNode, useState } from 'react';
import { MemberInfo } from '@/types/types';
import UserCard from '../user/UserCard';
import { BsQuestionCircle } from 'react-icons/bs';
import InfoBubble from '../InfoBubble';

type Props = {
  data: MemberInfo[];
  skeleton?: ReactNode;
};

const UserCardBox = ({ data, skeleton }: Props) => {
  const [question, setQuestion] = useState(false);
  const onQuestion = () => {
    setQuestion(true);
  };
  const offQuestion = () => {
    setQuestion(false);
  };
  return (
    <Box>
      <div className="nanum-bold">
        <div className="title-box">
          <span className="sub-title">BEST</span>
          <div className="title">
            {question && <InfoBubble type="rank" />}
            <span>
              명예의 전당
            </span>
            <span onMouseEnter={onQuestion} onMouseLeave={offQuestion}>
              <BsQuestionCircle />
            </span>
          </div>
        </div>
      </div>
      <div className="users-box">
        {data?.map((user: MemberInfo) => (
          <UserCard key={user.memberId} user={user} />
        ))}
        {skeleton}
      </div>
    </Box>
  );
};

export default UserCardBox;

const Box = styled.div`
  margin: 40px 0;
  > .nanum-bold {
    display: flex;
    justify-content: space-between;
    align-items: end;

    .title-box {
      display: flex;
      flex-direction: column;
      width: 100%;
      .sub-title {
        font-size: 14px;
        color: red;
      }
      .title {
        position: relative;
        display: flex;
        gap: 8px;
        span {
          display: flex;
        }
      }

      > div {
        display: flex;
        align-items: center;
      }
    }
  }
  .users-box {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    margin-top: 26px;
    gap: 16px;
    @media (max-width: 1300px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 960px) {
      display: flex;
      flex-direction: column;
    }
  }

  .box {
    display: flex;
    justify-content: center;
  }
`;
