import styled from 'styled-components';
import Tag from '../Tag';
import { formatDate2 } from '@/util/date';
import HeartBox from './HeartBox';
import AnswerBox from '../answer/AnswerBox';
import dynamic from 'next/dynamic';
import ContentSkeleton from '../skeleton/ContentSkeleton';
import SubBtn from '../button/SubBtn';
import { BsFillTrashFill, BsPencilFill } from 'react-icons/bs';

const ReactMarkdown = dynamic(() => import('@/components/editor/ContentBox'), {
  ssr: false,
  loading: () => <ContentSkeleton />,
});

type Props = {
  title: string;
  category?: string;
  status?: string;
  isAuthor: boolean;
  deleteEvent: () => void;
  moveEdit: () => void;
  createAt: string;
  view: number;
  totalAnswers: number;
  content: string;
  likeHandler: () => void;
  liked: boolean;
  totalLikes: number;
  articleRefetch: () => void;
};

const MainArticleBox = ({
  title,
  status,
  category,
  isAuthor,
  deleteEvent,
  moveEdit,
  createAt,
  view,
  totalAnswers,
  content,
  likeHandler,
  liked,
  totalLikes,
  articleRefetch,
}: Props) => {
  return (
    <Box>
      <div className="main-title">
        <div className="title">
          <div>{title}</div>
          <Tag>{status ? status : category}</Tag>
        </div>
        {isAuthor && (
          <div className="change-box">
            <SubBtn onClick={deleteEvent}>
              <BsFillTrashFill />
            </SubBtn>
            <SubBtn onClick={moveEdit}>
              <BsPencilFill />
            </SubBtn>
          </div>
        )}
      </div>
      <div className="sub-title">
        <div className="date">
          <span className="writeDate">작성일 : </span>
          {formatDate2(new Date(createAt))}
        </div>
        <div className="view">
          <span className="viewNum">조회수 : </span>
          {view}
        </div>
        <div className="comment">
          <span className="commentNum">댓글수 : </span>
          {totalAnswers}
        </div>
      </div>
      <div className="content">
        <ReactMarkdown content={content} />
      </div>
      <HeartBox
        likeHandler={likeHandler}
        liked={liked}
        totalLikes={totalLikes}
      />
      <AnswerBox articleRefetch={articleRefetch} />
    </Box>
  );
};

export default MainArticleBox;

const Box = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  font-size: 20px;
  padding: 20px 20px 36px;
  gap: 32px;

  > .content {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .main-title {
    display: flex;
    justify-content: space-between;

    .change-box {
      display: flex;
      gap: 8px;
    }

    .title {
      font-size: 27px;
      font-weight: 700;
      border-bottom: solid 1px #ececec;
      padding-bottom: 10px;
      display: flex;
      align-items: center;

      .category {
        font-size: 14px;
      }
    }
  }
  .sub-title {
    color: #9f9f9f;
    font-size: 13px;
    display: flex;
    gap: 32px;

    .writeDate,
    .viewNum {
      font-weight: 600;
    }
  }
`;
