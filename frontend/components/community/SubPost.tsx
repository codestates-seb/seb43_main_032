import styled from 'styled-components';
import EiditorSkeleton from '@/components/skeleton/EiditorSkeleton';
import dynamic from 'next/dynamic';
import { UseFormRegister } from 'react-hook-form';
import Btn from '../button/Btn';
import { Form } from '@/types/types';
const Editor = dynamic(() => import('@/components/editor/Editor'), {
  ssr: false,
  loading: () => <EiditorSkeleton />,
});

type Props = {
  type: number;
  register: UseFormRegister<Form>;
  changeContent: (value: string) => void;
  postProject: (e: { preventDefault: () => void }) => void;
  data?: {
    position: string;
    title: string;
    content: string;
  };
};

const SubPost = ({ register, changeContent, postProject, data }: Props) => {
  return (
    <Main>
      <form onSubmit={postProject}>
        <div className="nanum-bold">
          <div>
            <Btn>작성 완료</Btn>
          </div>
        </div>
        <div className="title">
          <input
            placeholder="제목을 등록해주세요."
            type="text"
            {...(register('title'), { value: data && data.title })}
          />
        </div>
        <div>
          <Editor changeContent={changeContent} content={data?.content} />
        </div>
      </form>
    </Main>
  );
};

export default SubPost;

const Main = styled.div`
  padding: var(--padding-2);
  input {
    width: 100%;
    padding: 12px;
    font-size: 14px;
    border: 1px solid #d0d3d2;
    box-shadow: var(--box-shadow);
    border-radius: var(--radius-def);
    padding-left: 8px;
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
    > .sub {
      font-size: 13px;
    }
    ul {
      padding: var(--padding-2);
      display: flex;
      flex-direction: column;
      gap: 16px;
      li {
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
      button {
        &:hover {
          box-shadow: var(--box-shadow);
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
        border: 1px solid #e1e7e5;
        box-shadow: var(--box-shadow);
        border-radius: var(--radius-def);
        padding: 7.5px 8px;
      }
    }
  }
`;
