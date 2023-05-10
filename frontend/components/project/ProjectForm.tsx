import GridBox from '@/components/GridBox';
import styled from 'styled-components';
import { ChangeEvent, useEffect, useState } from 'react';
import SelectStack from '@/components/stack/SelectStack';
import { api } from '@/util/api';
import { useRouter } from 'next/router';
import MainPost from '@/components/MainPost';
import { useForm } from 'react-hook-form';
import { DefaultObj } from '@/types/types';
import TagBox from '@/components/project/TagBox';
import PeriodBox from '@/components/project/PeriodBox';
import StacksBox from '@/components/project/StacksBox';
import { GrFormClose } from 'react-icons/gr';
import { useProject } from '@/hooks/react-query/useProject';
import { POSITIONS } from '@/constant/constant';

const ProjectForm = () => {
  const router = useRouter();

  //데이터
  const { projectQuery } = useProject();
  const data = projectQuery.data?.post_data;
  useEffect(() => {
    if (data) {
      const jobs = data?.jobs.map(
        (job) =>
          Object.entries(job).map(([key, value]) => ({ [key]: value.want }))[0]
      );
      setStart(new Date(data.start));
      setEnd(new Date(data.end));
      setStacks(data.stacks);
      setTags(data.tags);
      setContent(data.content);
      setJob(jobs);
    }
  }, [projectQuery.isLoading]);

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
  const [stacks, setStacks] = useState<string[]>([]);

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

  //직군 option
  const [option, setOption] = useState(1);
  const changeOption = (e: ChangeEvent<HTMLSelectElement>) => {
    setOption(Number(e.target.value));
  };

  //직군 상태
  const [jobs, setJob] = useState<{ [key: string]: number }[]>([]);
  const addJob = () => {
    if (jobs.map((x) => Object.keys(x)[0]).includes(watch().jobVal)) {
      return alert('동일한 직군은 추가할 수 없습니다.');
    }
    setJob([...jobs, { [watch().jobVal]: option }]);
    reset({
      ...watch(),
      jobVal: '',
    });
    setOption(1);
  };

  // 직군 삭제
  const deleteJob = (idx: number) => {
    setJob([...jobs.slice(0, idx), ...jobs.slice(idx + 1)]);
  };

  const jobNames = jobs.map((x) => Object.keys(x)[0]);
  const jobCount = jobs.map((x) => Object.values(x)[0]);

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
    if (jobNames.length === 0) {
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
      stacks,
      tags,
      jobs,
      position: watch().position,
      title: watch().title,
      content,
    };

    if (router.route.includes('create')) {
      if (confirm('정말 작성을 완료하시겠습니까?'))
        return api.post('/project', data).then(() => router.push('/'));
    }
    if (confirm('정말 수정을 완료하시겠습니까?'))
      return api
        .put(`/project/${router.query.id}`, data)
        .then(() => router.push('/'));
  };

  return (
    <GridBox>
      {stack && (
        <SelectStack
          offModal={offModal}
          stacks={stacks}
          setStacks={setStacks}
        />
      )}
      <Side>
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
        <StacksBox stacks={stacks} onModal={onModal} />
        <div className="want-box">
          <div>모집을 원하는 직군</div>
          <div className="job-box">
            <select {...register('jobVal', { value: data && data.position })}>
              {POSITIONS.map((position) => (
                <option key={position} value={position}>
                  {position}
                </option>
              ))}
            </select>
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
            {jobNames.map((x, i) => (
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
        data={
          data && {
            position: data?.position!,
            title: data?.title!,
            content: data?.content!,
          }
        }
      />
    </GridBox>
  );
};

export default ProjectForm;

const Side = styled.div`
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
      gap: 8px;
      > select {
        border: 1px solid #e1e7e5;
        box-shadow: var(--box-shadow);
        border-radius: var(--radius-def);
        padding: 8px;
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
