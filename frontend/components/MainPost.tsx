import styled from 'styled-components';
import EiditorSkeleton from '@/components/skeleton/EiditorSkeleton';
import dynamic from 'next/dynamic';
import { COMMUNITY_EX, POSITIONS, PROJECT_EX } from '@/constant/constant';
import { Form } from '@/types/types';
import { UseFormRegister } from 'react-hook-form';
import Btn from './button/Btn';
import { useRouter } from 'next/router';
const Editor = dynamic(() => import('@/components/editor/Editor'), {
  ssr: false,
  loading: () => <EiditorSkeleton />,
});

type Props = {
  register: UseFormRegister<Form>;
  changeContent: (value: string) => void;
  postProject: (e: { preventDefault: () => void }) => void;
  data?: {
    position: string;
    title: string;
    content: string;
  };
};

const MainPost = ({ register, changeContent, postProject, data }: Props) => {
  const router = useRouter();
  const isProject = router.route.includes('project');
  return (
    <Main>
      {isProject ? PROJECT_EX : COMMUNITY_EX}
      <form onSubmit={postProject}>
        <div className="nanum-bold">
          <div className="position-box">
            <div>{isProject ? '나의 포지션' : '카테고리'}</div>
            <div>
              <select
                {...register('position', { value: data && data.position })}
                className="position-select"
              >
                {POSITIONS.map((position) => (
                  <option key={position} value={position}>
                    {position}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="submit-box">
            <Btn>
              <span>
                {router.route.includes('edit') ? '수정 완료' : '작성 완료'}
              </span>
            </Btn>
          </div>
        </div>
        <div className="title">
          <input
            placeholder="제목을 등록해주세요."
            type="text"
            {...register('title', { value: data && data.title })}
          />
        </div>
        <div>
          <Editor changeContent={changeContent} content={data?.content} />
        </div>
      </form>
    </Main>
  );
};

export default MainPost;

const Main = styled.div`
  margin-bottom: 50px;
  .submit-box {
    button {
      cursor: pointer;
    }
  }
  input {
    width: 100%;
    padding: 12px;
    font-size: 14px;
    border: 1px solid #d0d3d2;
    border-radius: var(--radius-def);
    padding-left: 16px;
  }
  .explanation-box {
    width: 100%;
    border: 1px solid black;
    padding: var(--padding-2);
    border: 1px solid #d0d3d2;
    box-shadow: var(--box-shadow);
    border-radius: var(--radius-def);
    display: flex;
    flex-direction: column;
    gap: 16px;
    > .title {
      font-size: 18px;
    }
    font-family: 'Pretendard';
    > .sub {
      font-size: 13px;
    }
    ul {
      padding: var(--padding-2);
      display: flex;
      flex-direction: column;
      gap: 16px;
      li {
        font-family: 'Pretendard';
        color: #4a13ff;
        font-size: 12px;
        list-style: disc;
      }
    }
  }
  form {
    > div:first-child {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      margin: 24px 0px;

      @media (max-width: 360px) {
        width: 100%;
        flex-direction: column;
        gap: 4px;

        .position-box {
          width: 100%;
          display: flex;
          justify-content: space-between;
        }

        .submit-box {
          width: 100%;
          display: flex;
          justify-content: end;
          margin-right: 8px;
        }
      }
      button {
        &:hover {
          box-shadow: var(--box-shadow);
        }
      }

      .search-btn {
        background: #9b7aff;
        padding: 8px 20px;
        color: white;
        border-radius: 5px;
        border: none;
        font-size: 15px;
        font-weight: 500;
        transition: background 0.3s ease-out;

        :hover {
          background: #6333ff;
        }
      }
    }
    > div:last-child {
      margin-top: 16px;
      font-size: 16px;
    }
    .position-box {
      display: flex;
      align-items: center;
      gap: 16px;
      select {
        margin: 0px 8px;
        border: solid 2px #ececec;
        border-radius: 10px;
        padding: 8px;
        color: #7d7d7d;
        :focus {
          outline: none;
        }
      }
    }
  }
`;
