import styled from 'styled-components';
import EiditorSkeleton from '@/components/editor/EiditorSkeleton';
import dynamic from 'next/dynamic';
import { ChangeEvent } from 'react';
import { COMMUNITY_EX, PROJECT_EX } from '@/constant/constant';
const Editor = dynamic(() => import('@/components/editor/Editor'), {
  ssr: false,
  loading: () => <EiditorSkeleton />,
});

type Props = {
  type: number;
  form: {
    tagVal?: string;
    jobVal?: string;
    position: string;
    formTitle: string;
  };
  changeEditor: (value: any) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const MainPost = ({ form, changeEditor, onChange, type }: Props) => {
  return (
    <Main>
      {type === 1 ? PROJECT_EX : COMMUNITY_EX}
      <form action="#">
        <div className="nanum-bold">
          <div>나의 포지션</div>
          <div>
            <input
              name="position"
              value={form.position}
              onChange={onChange}
              type="text"
              placeholder="포지션을 입력해주세요."
            />
          </div>
        </div>
        <div className="title">
          <input
            placeholder="제목을 등록해주세요."
            type="text"
            name="formTitle"
            value={form.formTitle}
            onChange={onChange}
          />
        </div>
        <div>
          <Editor changeEditor={changeEditor} />
        </div>
      </form>
    </Main>
  );
};

export default MainPost;

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
      gap: 16px;
      margin: 24px 0px;
    }
    > div:last-child {
      margin: 16px 0px;
      font-size: 14px;
    }
  }
`;
