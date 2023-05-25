import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import Tag from '../Tag';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Position from '../Position';
import { onChatCreate } from '@/util/chat';

type Props = {
  userImg: string;
  userName: string;
  isAuthor: boolean;
  totalStar: number;
  userId: number;
  position: string;
  totalProject: number;
};

const AuthorBox = ({
  userId,
  userImg,
  userName,
  isAuthor,
  totalStar,
  position,
  totalProject,
}: Props) => {
  const router = useRouter();
  const moveAuthorPage = (memberId: number) => {
    router.push(`/users/${memberId}`);
  };

  const onChatCreatePage = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    onChatCreate(userId);
  };

  return (
    <Box onClick={() => moveAuthorPage(userId)}>
      <div className="top-box">
        <img src={userImg} alt="author" />
        <div className="userBox nanum-bold userName">{userName}</div>
        {position && <Position>{position}</Position>}
      </div>
      <div className="detail-box">
        <div className="detail-sub-box">
          <div className="detail-num">
            {totalProject} <span>개</span>
          </div>
          <div className="detail-title">진행 프로젝트</div>
        </div>
        <div className="center-border"></div>
        <div className="detail-sub-box">
          <div className="detail-num">
            {totalStar} <span>개</span>
          </div>
          <div className="detail-title">평가 점수</div>
        </div>
      </div>
      {!isAuthor && <Tag onClick={onChatCreatePage}>쪽지 보내기</Tag>}
    </Box>
  );
};
export default AuthorBox;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 15px;
  align-items: center;
  cursor: pointer;
  padding: 40px 30px 20px;
  border: solid 2px #ececec;
  margin-bottom: 24px;

  .tag {
    margin-top: 30px;
  }

  .top-box {
    width: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-bottom: solid 2px #ececec;
    padding-bottom: 20px;

    > img {
      width: 200px;
      height: 200px;
      border-radius: 50%;
      background-color: white;
      box-shadow: 0px 0px 11px 11px rgba(234, 234, 234, 0.77);
      margin-bottom: 20px;
    }

    > .userBox {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 16px;
      padding: 10px;
      padding-bottom: 4px;
      font-weight: bold;
      color: #9f9f9f;
    }

    > .userName {
      font-size: 18px;
      padding-top: 0;
    }
    > .saveStar {
      position: absolute;
      width: 50px;
      height: 50px;
      background-color: #cecece;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      top: 0;
      right: 0;
      cursor: pointer;

      > .icon-box {
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 30px;
      }
    }
  }

  .detail-box {
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-bottom: 24px;

    > .center-border {
      width: 1px;
      height: 150%;
      border: solid 1px #ececec;
    }

    > .detail-sub-box {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;

      > .detail-num {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
        width: 100%;
        font-size: 24px;

        > span {
          font-size: 15px;
          color: #828282;
        }
      }

      > .detail-title {
        font-size: 12px;
      }
    }
  }
`;
