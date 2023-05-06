import GridBox from '@/components/GridBox';
import styled from 'styled-components';
import { ChangeEvent, useEffect, useState } from 'react';
import SelectStack from '@/components/stack/SelectStack';
import { api } from '@/util/api';
import { useRouter } from 'next/router';
import MainPost from '@/components/MainPost';
import { useForm } from 'react-hook-form';
import { DefaultObj } from '@/types/types';
import PostBtn from '@/components/PostBtn';
import TagBox from '@/components/project/TagBox';
import PeriodBox from '@/components/project/PeriodBox';
import StacksBox from '@/components/project/StacksBox';
import { GrFormClose } from 'react-icons/gr';

const CreateProject = () => {
  const router = useRouter();

  //input 관리
  const { register, watch, reset } = useForm<DefaultObj>();

  //시작일
  const [start, setStart] = useState<Date | null>();

  //종료일
  const [end, setEnd] = useState<Date | null>();

  //달력 선택
  const handleRangeChange = (dates: [Date | null, Date | null]) => {
    const [startDate, endDate] = dates;
    setStart(startDate);
    setEnd(endDate);
  };

  //스택 모달 관련
  const [stack, setStack] = useState(false);
  const onModal = () => {
    setStack(true);
  };
  const offModal = () => {
    setStack(false);
  };

  //esc 버튼 누르면 스택 모달창이 닫히도록
  useEffect(() => {
    const handleKeyPress = (event: { key: string }) => {
      if (event.key === 'Escape') {
        setStack(false);
      }
    };
    if (stack) {
      window.addEventListener('keydown', handleKeyPress);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [stack]);

  //선택된 스택 관련
  const [select, setSelect] = useState<string[]>([]);

  //해시태그 값 상태
  const [tags, setTags] = useState<string[]>([]);

  //해시태그 키 다운
  const tagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const trim = watch().tagVal.trim();
    if ((e.key === 'Enter' || e.key === ' ') && trim !== '') {
      addTag(trim);
      reset({
        ...watch(),
        tagVal: '',
      });
    }
  };

  // 해시태그 업데이트
  const addTag = (tag: string) => {
    setTags([...tags, tag]);
  };

  // 해시태그 삭제
  const deleteTag = (idx: number) => {
    setTags([...tags.slice(0, idx), ...tags.slice(idx + 1)]);
  };

  //직군 옵션
  const optionArr = Array(9)
    .fill(1)
    .map((x, i) => x + i);

  //직군 input
  const jobKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && watch().jobVal !== '') {
      setJob([...job, { [watch().jobVal]: option }]);
      reset({
        ...watch(),
        jobVal: '',
      });
      setOption(1);
    } else if (e.key === 'Enter' && watch().jobVal === '') {
      setWarning(true);
    }
  };

  //직군 option
  const [option, setOption] = useState(1);
  const changeOption = (e: ChangeEvent<HTMLSelectElement>) => {
    setOption(Number(e.target.value));
  };

  //직군 input 테두리 경고
  const [warning, setWarning] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setWarning(false);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [warning]);

  //직군 상태
  const [job, setJob] = useState<{ [key: string]: number }[]>([]);
  const addJob = () => {
    if (watch().jobVal === '') {
      return setWarning(true);
    }
    setJob([...job, { [watch().jobVal]: option }]);
    reset({
      ...watch(),
      jobVal: '',
    });
    setOption(1);
  };

  // 직군 삭제
  const deleteJob = (idx: number) => {
    setJob([...job.slice(0, idx), ...job.slice(idx + 1)]);
  };

  const jobs = job.map((x) => Object.keys(x)[0]);
  const jobCount = job.map((x) => Object.values(x)[0]);

  //에디터 상태
  const [content, setContent] = useState('');
  const changeContent = (value: string) => {
    setContent(value);
  };

  //프로젝트 글 완료 이벤트
  const postProject = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!start) {
      return alert('프로젝트 기간을 설정해주세요.');
    }
    if (job.length === 0) {
      return alert('모집 직군은 최소 1개 이상 등록해주세요.');
    }
    if (watch().title === '') {
      return alert('제목을 입력해주세요.');
    }
    if (content === '') {
      return alert('내용을 입력해주세요.');
    }
    const data = {
      start,
      end,
      select,
      tags,
      job,
      position: watch().position,
      title: watch().title,
      content,
    };
    if (confirm('정말 작성을 완료하시겠습니까?'))
      api.post('/project', data).then(() => router.push('/'));
  };
  return (
    <GridBox>
      {stack && (
        <SelectStack
          offModal={offModal}
          select={select}
          setSelect={setSelect}
        />
      )}
      <Side warning={warning}>
        <PeriodBox
          start={start}
          end={end}
          handleRangeChange={handleRangeChange}
        />
        <TagBox
          tags={tags}
          register={register}
          tagKeyDown={tagKeyDown}
          deleteTag={deleteTag}
        />
        <StacksBox select={select} onModal={onModal} />
        <div className="want-box">
          <div>모집을 원하는 직군</div>
          <div className="job-box">
            <input type="text" {...register('jobVal')} onKeyDown={jobKeyDown} />
            <select value={option} onChange={changeOption}>
              {optionArr.map((x) => (
                <option key={x} value={x}>
                  {x}명
                </option>
              ))}
            </select>
            <button onClick={addJob}>등록</button>
          </div>
          <ul>
            {jobs.map((x, i) => (
              <li className="nanum-regular" key={`${x}+${i}`}>
                <div>{x}</div>
                <div>{jobCount[i]}명</div>
                <div className="delete">
                  <GrFormClose onClick={() => deleteJob(i)} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Side>
      <MainPost
        type={1}
        register={register}
        changeContent={changeContent}
        postProject={postProject}
      />
    </GridBox>
  );
};

export default CreateProject;

type SideProps = {
  warning: boolean;
};

const Side = styled.div<SideProps>`
  width: 100%;
  padding: var(--padding-1);
  display: flex;
  align-items: center;
  flex-direction: column;

  button {
    cursor: pointer;
    border: none;
    padding: 8px 32px;
    font-weight: 700;
    border-radius: var(--radius-def);
    :hover {
      background-color: #e1e7e5;
    }
  }

  .button-box {
    width: 100%;
    min-height: 40px;
    display: flex;
    justify-content: center;
  }

  > div {
    margin-bottom: 32px;
    > div:first-child {
      font-family: var(--font-nanum);
      font-size: 23px;
      font-weight: 700;
      margin-bottom: 24px;
    }
  }

  .noto-regular-13 {
    min-height: 13px;
    gap: 8px;
  }

  .want-box {
    display: flex;
    flex-direction: column;
    align-items: center;

    > ul {
      margin-top: 12px;
      flex-direction: column;
      width: 70%;
      > li {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 16px 0px;
        border-bottom: 1px solid #e4e4e7;
        > div:first-child {
          flex: 1;
        }
      }
    }

    .delete {
      display: flex;
      align-items: center;
      cursor: pointer;
    }

    .job-box {
      display: flex;
      justify-content: center;
      > input {
        width: 50%;
        border: ${(props) => props.warning && '1px solid red'};
        :focus {
          outline: ${(props) => props.warning && '1px solid red'};
        }
      }
      > select {
        margin: 0px 10px;
        border: 1px solid #e1e7e5;
        box-shadow: var(--box-shadow);
        border-radius: var(--radius-def);
      }
      > button {
        padding: 8px;
        min-width: 48px;
      }
    }
  }

  input {
    padding: 6px;
    border: 1px solid #e1e7e5;
    box-shadow: var(--box-shadow);
    border-radius: var(--radius-def);
    padding-left: 8px;
  }
`;
