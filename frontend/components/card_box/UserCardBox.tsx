import styled from 'styled-components';
import { ReactNode } from 'react';
import { MemberInfo } from '@/types/types';
import UserCard from '../user/UserCard';
import { AiFillStar } from 'react-icons/ai';

type Props = {
  data: MemberInfo[];
  skeleton?: ReactNode;
};

const UserCardBox = ({ data, skeleton }: Props) => {
  return (
    <Box>
      <div className="nanum-bold">
        <div className="title-box">
          <div>
            <AiFillStar size={20} style={{ color: 'gold' }} />
            명예의 전당
            <AiFillStar size={20} style={{ color: 'gold' }} />
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
  margin-bottom: 40px;
  > .nanum-bold {
    display: flex;
    justify-content: space-between;
    align-items: end;

    .title-box {
      display: flex;
      flex-direction: column;
      width: 100%;
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
`;
