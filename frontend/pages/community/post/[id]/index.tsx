import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Community } from '@/types/community';
import { useCommunity } from '@/hooks/react-query/community/useCommunity';
import { getCookie } from '@/util/cookie';
import { postStar } from '@/util/api/postStar';
import { confirmAlert, errorAlert } from '@/components/alert/Alert';
import Message from '@/components/Message';
import GridBox from '@/components/common_box/GridBox';
import AuthorBox from '@/components/common_box/AuthorBox';
import TagBox from '@/components/project/TagBox';
import MainArticleBox from '@/components/common_box/MainArticleBox';
import Head from 'next/head';

// item 개별 페이지
const ViewCommunity = () => {
  const router = useRouter();
  const id = router.query.id;
  const address = `/articles/${id}`;
  const queryKey = ['articles', 'post', id];

  const {
    communityQuery,
    moveEdit,
    deleteArticle,
    refetch,
    likeCommunity,
    dislikeCommunity,
  } = useCommunity<Community>({
    address,
    queryKey,
  });
  const data = communityQuery.data?.data;

  //좋아요 이벤트
  const likeHandler = () => {
    if (!getCookie('accessToken')) {
      return errorAlert('로그인이 필요합니다.', '좋아요');
    }
    if (data?.liked) {
      postStar(data.memberInfo.memberId, -1);
      return dislikeCommunity.mutate();
    }
    data && postStar(data.memberInfo.memberId, 1);
    likeCommunity.mutate();
  };

  //게시글이 수정되었을 때를 위해
  useEffect(() => {
    refetch();
  }, [router]);

  const deleteEvent = () => {
    confirmAlert('정말 게시글을 삭제하시겠습니까?', '게시글 삭제가').then(() =>
      deleteArticle.mutate()
    );
  };
  if (communityQuery.error)
    return <Message>잠시 후에 다시 시도해주세요.</Message>;
  if (communityQuery.isLoading) return <Message>로딩중입니다.</Message>;
  return (
    <>
      <Head>
        <title>{`SIDE QUEST - ${data?.title}`}</title>
      </Head>
      <GridBox>
        {data && (
          <>
            <Side>
              <AuthorBox
                totalProject={data.memberInfo.totalProject}
                userId={data.memberInfo.memberId}
                userImg={data.memberInfo.profileImageUrl}
                userName={data.memberInfo.name}
                isAuthor={data.author}
                totalStar={data.memberInfo.totalStar}
                position={data.memberInfo.position}
              />
              <TagBox
                tags={data.techList.map((item) => ({ field: item.tech }))}
              />
            </Side>
            <MainArticleBox
              title={data.title}
              category={data.category}
              isAuthor={data.author}
              deleteEvent={deleteEvent}
              moveEdit={moveEdit}
              createAt={data.createdAt}
              view={data.view}
              totalAnswers={data.totalAnswers}
              content={data.content}
              likeHandler={likeHandler}
              liked={data.liked}
              totalLikes={data.totalLikes}
              articleRefetch={refetch}
            />
          </>
        )}
      </GridBox>
    </>
  );
};

export default ViewCommunity;

const Side = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  padding: var(--padding-1);

  > .right {
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 15px;
    align-items: center;
    padding: 40px 30px 20px;
    border: solid 2px #ececec;
    margin-bottom: 24px;

    .tag {
      margin-left: 30px;
    }

    .Side-box {
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
        padding-left: 0;
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
        left: 0;
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
  }
`;
