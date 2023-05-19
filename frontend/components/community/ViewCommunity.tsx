import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styled from 'styled-components';
import { FaHeart } from 'react-icons/fa';
import dynamic from 'next/dynamic';
import ContentSkeleton from '../skeleton/ContentSkeleton';
import Message from '../Message';
import { Community } from '@/types/community';
import { useCommunity } from '@/hooks/react-query/community/useCommunity';
import AnswerBox from '../AnswerBox';
import GridBox from '../GridBox';
import Tag from '../Tag';
import { useRecoilValue } from 'recoil';
import { loggedInUserState } from '@/recoil/atom';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { formatDate2 } from '@/util/date';

const ReactMarkdown = dynamic(() => import('@/components/editor/ContentBox'), {
  ssr: false,
  loading: () => <ContentSkeleton />,
});

// item 개별 페이지
const ViewCommunity = () => {
  const router = useRouter();
  const id = router.query.id;
  const address = `/articles/${id}`;
  const queryKey = ['articles', 'post', id];

  // 임시 데이터
  const loggedInUser = useRecoilValue(loggedInUserState);
  const project = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const [userHeart, setUserHeart] = useState(false);

  const { communityQuery } = useCommunity<Community>({
    address,
    queryKey,
  });
  const data = communityQuery.data?.data;

  if (communityQuery.isLoading) return <Message>로딩중입니다.</Message>;
  if (communityQuery.error)
    return <Message>잠시 후 다시 시도해주세요.</Message>;
  return (
    <GridBox>
      {data && (
        <>
          <Top>
            <div className="right">
              <div className="top-box">
                <img src={data.memberInfo.profileImageUrl}></img>
                <div className="userBox nanum-bold userName">
                  {data.memberInfo.name}
                </div>
                {data.memberInfo.email !== loggedInUser?.email && (
                  <div
                    className="saveStar"
                    onClick={() => setUserHeart(!userHeart)}
                  >
                    <span className="icon-box">
                      {userHeart ? (
                        <AiOutlineHeart fill={'#ececec'} />
                      ) : (
                        <AiFillHeart fill="red" />
                      )}
                    </span>
                  </div>
                )}
              </div>
              <div className="detail-box">
                <div className="detail-sub-box">
                  <div className="detail-num">
                    {project.length} <span>개</span>
                  </div>
                  <div className="detail-title">진행 프로젝트</div>
                </div>
                <div className="center-border"></div>
                <div className="detail-sub-box">
                  <div className="detail-num">
                    {data.totalLikes} <span>개</span>
                  </div>
                  <div className="detail-title">평가 점수</div>
                </div>
              </div>
              {data.memberInfo.email !== loggedInUser?.email && (
                <Tag>쪽지 보내기</Tag>
              )}
            </div>
          </Top>
          <Bottom>
            <div className="main-title">
              <div className="title">{data.title}</div>
            </div>
            <div className="sub-title">
              <div className="date">
                <span className="writeDate">작성일 : </span>
                {data.createdAt.slice(0, 10)}
              </div>

              <div className="view">
                <span className="viewNum">조회수 : </span>
                {data.view}
              </div>

              <div className="comment">
                <span className="commentNum">댓글수 : </span>
              </div>
            </div>
            <div className="content">
              <ReactMarkdown content={data.content}></ReactMarkdown>
              <AnswerBox />
            </div>
          </Bottom>
        </>
      )}
    </GridBox>
  );
};

export default ViewCommunity;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px;
  margin-bottom: 20px;

  > .right {
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 15px;
    align-items: center;
    padding: 40px 30px 20px;
    border: solid 2px #ececec;

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

    > .detail-box {
      display: flex;
      width: 80%;
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

        > .detail-num {
          padding: 10px;
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
  }
`;

const Bottom = styled.div`
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
    gap: 40px;
  }

  > .comment {
    display: flex;
    flex-direction: column;

    > .each {
      color: black;

      > .box {
        height: 100px;
        border: solid 1px black;
        padding: 5px;
        margin-top: 5px;
        border-radius: 10px;
      }
    }
  }

  .main-title {
    display: flex;
    flex-direction: column;

    .title {
      font-size: 27px;
      font-weight: 700;
      border-bottom: solid 1px #ececec;
      padding-bottom: 10px;
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
