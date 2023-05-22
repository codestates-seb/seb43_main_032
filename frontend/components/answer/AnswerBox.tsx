import styled from 'styled-components';
import dynamic from 'next/dynamic';
import hljs from 'highlight.js';
import Pagenation from '../Pagenation';
import { useRouter } from 'next/router';
import { useGetAnswer } from '@/hooks/react-query/answer/useGetAnswer';
import { useEffect, useState } from 'react';
import { useAnswer } from '@/hooks/react-query/answer/useAnswer';
import AnswerItem from './AnswerItem';
import AnswerSkeleton from '../skeleton/AnswerSkeleton';
import AnswerItemSkeleton from '../skeleton/AnswerItemSkeleton';

const Editor = dynamic(() => import('@/components/editor/Editor'), {
  ssr: false,
  loading: () => <AnswerSkeleton />,
});

//이상하게 Editor에서 조건부로 옵션을 설정하면 editor가 고장나서 상위에서 설정한 옵션을 내려주는 방식으로 해결하였음
const ANSWER_OPTIONS: EasyMDE.Options = {
  renderingConfig: {
    codeSyntaxHighlighting: true,
    hljs,
  }, //hljs 사용
  maxHeight: '120px',
  spellChecker: false, //스펠체크 off
  status: false, //우측 하단 상태
  previewClass: ['markdown-body'], //github 마크다운 사용
  hideIcons: ['guide', 'fullscreen', 'side-by-side'], //버튼 가리기
};

type Form = {
  category: 'PROJECT' | 'ARTICLE';
  postId: number;
  params: string;
};

type Props = {
  articleRefetch: () => void;
};

const AnswerBox = ({ articleRefetch }: Props) => {
  const router = useRouter();
  const { id } = router.query;

  //답글 editor 관리
  const [answerVal, setAnswerVal] = useState('');
  const changeAnswerVal = (value: string) => {
    setAnswerVal(value);
  };

  //답글 페이지 네이션
  const [answerPage, setCommentPage] = useState(1);
  const answerPageHandler = (num: number) => {
    setCommentPage(num);
  };

  //답글 호출 폼
  const getForm: Form = router.asPath.includes('project')
    ? {
        category: 'PROJECT',
        postId: Number(id),
        params: `size=5&page=${answerPage}`,
      }
    : {
        category: 'ARTICLE',
        postId: Number(id),
        params: `size=5&page=${answerPage}`,
      };

  //게시글에 해당하는 답글 데이터
  const { answerQuery, answerRefetch, answerPageCount } = useGetAnswer(getForm);

  //답글 데이터
  const answerData = answerQuery.data?.data;

  //답글 페이지가 바뀌면 refetch를 실행하기 위한 effect
  useEffect(() => {
    answerRefetch();
  }, [answerPage]);

  //답글 CRUD 함수
  const { postAnswer, deleteAnswer, editAnswer, likeAnswer, dislikeAnswer } =
    useAnswer({
      answerRefetch,
      changeAnswerVal,
      articleRefetch,
    });

  //작성 이벤트
  const postEvent = () => {
    postAnswer.mutate({ content: answerVal });
  };

  return (
    <Box>
      <div className="comment-write-box">
        <div className="comment-submit-box">
          <button onClick={postEvent}>답글 작성</button>
        </div>
        <Editor
          content={answerVal}
          commentOptions={ANSWER_OPTIONS}
          changeContent={changeAnswerVal}
          type={'answer'}
        />
      </div>
      <div className="view-comment">
        <ul>
          {answerQuery.isLoading && <AnswerItemSkeleton count={5} />}
          {answerData &&
            answerData.map((answer) => (
              <AnswerItem
                key={answer.answerId}
                isAuthor={answer.author}
                answer={answer}
                deleteAnswer={deleteAnswer}
                editAnswer={editAnswer}
                likeAnswer={likeAnswer}
                dislikeAnswer={dislikeAnswer}
              />
            ))}
        </ul>
      </div>
      <Pagenation
        onPageChange={answerPageHandler}
        page={answerPage}
        pageSize={answerPageCount ? Math.ceil(answerPageCount / 5) : 0}
      />
    </Box>
  );
};
export default AnswerBox;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 15px;
  gap: 16px;
  > div {
    width: 100%;
  }

  .view-comment {
    ul {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
  }

  .comment-write-box {
    width: 100%;
    position: relative;
    .comment-submit-box {
      position: absolute;
      top: 6px;
      z-index: 2;
      right: 6px;
      button {
        font-family: 'Pretendard';
        height: 100%;
        padding: 10px 10px;
        font-size: 14px;
        font-weight: 600;
        color: #979797;
        border-radius: 10px;
        border: none;
        cursor: pointer;
        transition: background 0.5s ease, color 0.5s ease;
        :hover {
          background: #9b7aff;
          color: white;
          border-radius: 5px;
        }
      }
    }
  }
`;
