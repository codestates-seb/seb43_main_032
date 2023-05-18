import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styled from 'styled-components';
import { FaHeart } from 'react-icons/fa';
import dynamic from 'next/dynamic';
import ContentSkeleton from '../skeleton/ContentSkeleton';
import EiditorSkeleton from '../skeleton/EiditorSkeleton';
import Message from '../Message';
import Btn from '../button/Btn';
import { Community } from '@/types/community';
import CommentBox from '../CommentBox';
import { useCommunity } from '@/hooks/react-query/community/useCommunity';

const ReactMarkdown = dynamic(() => import('@/components/editor/ContentBox'), {
  ssr: false,
  loading: () => <ContentSkeleton />,
});

const Editor = dynamic(() => import('@/components/editor/Editor'), {
  ssr: false,
  loading: () => <EiditorSkeleton />,
});

// item 개별 페이지
const ViewCommunity = () => {
  const router = useRouter();
  const id = router.query.id;
  const address = `/articles/${id}`;
  const queryKey = ['articles', 'post', id];

  const { communityQuery } = useCommunity<Community>({
    address,
    queryKey,
  });
  const data = communityQuery.data?.data;

  //댓글 관련
  const [commentVal, setCommentVal] = useState('');
  const changeCommentVal = (val: string) => {
    setCommentVal(val);
  };

  const addComment = () => {
    //댓글 추가 이벤트를 작성해주세요~~~
  };

  //댓글 페이지 네이션
  const [commentPage, setCommentPage] = useState(1);
  const commentPageHandler = (num: number) => {
    setCommentPage(num);
  };

  if (communityQuery.isLoading) return <Message>로딩중입니다.</Message>;
  if (communityQuery.error)
    return <Message>잠시 후 다시 시도해주세요.</Message>;
  return (
    <Container>
      {data && (
        <>
          <Top>
            <div className="left">
              <div className="title">{data.title}</div>
              <div className="date">{data.createdAt}</div>
            </div>
            <div className="right">
              <img src={data.memberInfo.profileImageUrl}></img>
              <div className="userBox nanum-bold userStar">
                <FaHeart color="red" /> {data.totalLikes}
              </div>
              <div className="userBox nanum-bold userMail">
                {data.memberInfo.email}
              </div>
            </div>
          </Top>
          <Bottom>
            <div className="content">
              <ReactMarkdown
                content={data.content}
                backColor="white"
              ></ReactMarkdown>
              <CommentBox
                commentPage={commentPage}
                commentPageHandler={commentPageHandler}
                addComment={addComment}
                commentVal={commentVal}
                changeCommentVal={changeCommentVal}
                commentData={[]}
              />
            </div>
          </Bottom>
        </>
      )}
    </Container>
  );
};

export default ViewCommunity;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  color: #fff;

  &:first-child {
    padding-left: 0;
    padding-right: 0;
  }
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px;
  border-radius: 15px;
  background: linear-gradient(-45deg, #ffc6fd, #e812c1, #7402e0);
  background-size: 400% 400%;
  animation: AnimationName 15s ease infinite;
  width: 100%;
  top: 35%;
  text-align: center;
  margin-bottom: 20px;

  > .left {
    height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: start;
    font-size: 50px;
    color: white;

    > .title {
      margin-bottom: 20px;
    }

    > .date {
      font-size: 15px;
    }
  }
  > .right {
    height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: end;

    > img {
      width: 100px;
      height: 100px;
      border: solid 2px gray;
      border-radius: 50%;
      background-color: white;
    }

    > .userBox {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 10px;
      padding-bottom: 4px;
      font-size: 15px;
      font-weight: bold;
      color: white;
    }

    > .userMail {
      padding-top: 0;
    }
  }

  @-webkit-keyframes AnimationName {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  @-moz-keyframes AnimationName {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  @-o-keyframes AnimationName {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  @keyframes AnimationName {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

const Bottom = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 20px;

  > .content {
    width: 68%;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 40px;
  }

  > .comment {
    display: flex;
    flex-direction: column;
    width: 30%;

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
`;
