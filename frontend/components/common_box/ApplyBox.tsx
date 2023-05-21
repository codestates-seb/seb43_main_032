import { useState } from 'react';
import SubBtn from '../button/SubBtn';
import styled from 'styled-components';
import { MemberInfo } from '@/types/types';

type Props = {
  crewList: {
    position: string;
    projectId: number;
    memberInfo: MemberInfo;
  }[];
  acceptEvent: (memberId: number) => void;
  rejectEvent: (memberId: number) => void;
};

const ApplyBox = ({ crewList, acceptEvent, rejectEvent }: Props) => {
  const [applyBox, setApplyBox] = useState(false);
  const applyBoxHandler = () => {
    setApplyBox(!applyBox);
  };
  return (
    <Box>
      <div>
        <SubBtn onClick={applyBoxHandler}>지원자 확인</SubBtn>
      </div>
      {applyBox && (
        <div className="apply-list">
          <ul className="select-box">
            {crewList.map((crew) => (
              <li className="crew">
                <div className="crew-profile">
                  <div className="img-box">
                    <img src={crew.memberInfo.profileImageUrl} alt="crew-img" />
                  </div>
                  <div>아이디</div>
                </div>
                <div className="btn-box">
                  <SubBtn
                    onClick={() => acceptEvent(crew.memberInfo.memberId)}
                    className="accept"
                  >
                    수락
                  </SubBtn>
                  <SubBtn
                    onClick={() => rejectEvent(crew.memberInfo.memberId)}
                    className="reject"
                  >
                    거절
                  </SubBtn>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Box>
  );
};

export default ApplyBox;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  padding: var(--padding-2);
  justify-content: center;
  align-items: center;

  .accept {
    background-color: #49e256;
  }
  .reject {
    background-color: #ec5353;
  }

  .apply-list {
    margin-top: 16px;
    width: 100%;
    height: 300px;
    display: flex;
    justify-content: center;
  }

  .img-box {
    width: 24px;
    height: 24px;
    > img {
      width: 100%;
      height: 100%;
    }
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
  .crew {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 0px 28px;
  }

  .crew-profile {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .btn-box {
    display: flex;
    gap: 48px;
    justify-content: center;
    > button {
      padding: 4px;
    }
  }
`;
