import { api } from '@/util/api';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Loading from '../Loading';
import Error from '../Error';
import { Article } from '@/types/types';
import styled from 'styled-components';
import { FaHeart } from 'react-icons/fa';
import dynamic from 'next/dynamic';
import ContentSkeleton from '../skeleton/ContentSkeleton';
import EiditorSkeleton from '../skeleton/EiditorSkeleton';
const ReactMarkdown = dynamic(() => import('@/components/ContentBox'), {
  ssr: false,
  loading: () => <ContentSkeleton />,
});

const Editor = dynamic(() => import('@/components/editor/Editor'), {
  ssr: false,
  loading: () => <EiditorSkeleton />,
});

// item 개별 페이지
export default function PostPage() {
  const [currentData, setCurrentData] = useState<Article>();

  const router = useRouter();
  const id = router.query.id;

  const { isLoading, isError, error, data } = useQuery('post', async () => {
    const endpoint = `/community/post/${id}`;
    return await api(endpoint).then((res) => {
      setCurrentData(res.data.eachPost);
    });
  });
  console.log(currentData);

  if (isLoading) return <Loading />;
  if (error) return <Error>잠시 후 다시 시도해주세요.</Error>;
  if (!currentData) return <div>데이터가 없습니다.</div>;
  if (currentData)
    return (
      <Container>
        <Top>
          <div className="left">
            <div className="title">{currentData.title}asdasdasdasdasd</div>
            <div className="date">{currentData.createdAt}</div>
          </div>
          <div className="right">
            <img src={currentData.avatar}></img>
            <div className="userBox nanum-bold userStar">
              <FaHeart color="red" /> {currentData.userStar}
            </div>
            <div className="userBox nanum-bold userMail">
              {currentData.email.split('@')[0]}
            </div>
          </div>
        </Top>
        <Bottom>
          <div className="content">
            <ReactMarkdown
              content={currentData.content}
              backColor="white"
            ></ReactMarkdown>
          </div>
          <div className="comment">
            <Editor></Editor>
          </div>
        </Bottom>
      </Container>
    );
}

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
    width: 70%;
  }
`;
