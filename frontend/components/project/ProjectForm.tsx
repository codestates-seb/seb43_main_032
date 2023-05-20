import styled from 'styled-components';
import { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import MainPost from '@/components/MainPost';
import { useForm } from 'react-hook-form';
import TagBox from '@/components/project/TagBox';
import PeriodBox from '@/components/project/PeriodBox';
import { POSITIONS } from '@/constant/constant';
import Btn from '../button/Btn';
import { Form } from '@/types/types';
import { Tech, FiledTag, WantCrew } from '@/types/project';
import { formatDate3 } from '@/util/date';
import { AiOutlineClose } from 'react-icons/ai';
import { useProject } from '@/hooks/react-query/project/useProject';
import StacksBox from './StacksBox';
import GridBox from '../common_box/GridBox';

const ProjectForm = () => {
  const router = useRouter();

  //데이터
  const { projectQuery, submitEdit, submitPost } = useProject();
  const data = projectQuery.data?.data;
  console.log(data);
  useEffect(() => {
    if (data) {
      setStart(new Date(data.startDate));
      setEnd(new Date(data.endDate));
      setStacks(data.techList);
      setTags(data.fieldList);
      setContent(data.content);
      setJob(data.positionCrewList);
    }
  }, [projectQuery.isLoading]);

  //input 관리
  const { register, watch, reset } = useForm<Form>();

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
    if (stack) setStack(false);
    if (!stack) setStack(true);
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
  const [stacks, setStacks] = useState<Tech[]>([]);

  //해시태그 값 상태
  const [tags, setTags] = useState<FiledTag[]>([]);

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
    setTags([...tags, { field: tag }]);
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
  const [jobs, setJob] = useState<WantCrew[]>([]);
  const addJob = () => {
    if (watch().jobVal === '') {
      return alert('직군을 선택해주세요.');
    }
    if (jobs.filter((job) => job.position === watch().jobVal).length > 0) {
      return alert('동일한 직군은 추가할 수 없습니다.');
    }
    setJob([
      ...jobs,
      { position: watch().jobVal, number: option, acceptedNumber: 0 },
    ]);
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
    if (jobs.length === 0) {
      return alert('모집 직군은 최소 1개 이상 등록해주세요.');
    }
    if (watch().title === '') {
      return alert('제목을 입력해주세요.');
    }
    if (content === '') {
      return alert('내용을 입력해주세요.');
    }

    //랜덤 이미지 생성
    const randomNumber = Math.floor(Math.random() * 5) + 1;
    const srcSvg = `/images/thum (${randomNumber}).svg`;

    //공통 데이터
    const data = {
      startDate: formatDate3(start),
      endDate: end && formatDate3(end),
      writerPosition: watch().position,
      title: watch().title,
      thumbnailImageUrl: srcSvg,
      content,
      techList: {
        techList: stacks.map((stack) => stack.tech),
      },
      fieldList: {
        fieldList: tags.map((tag) => tag.field),
      },
      positionCrewList: {
        positionList: jobs.map((job) => job.position),
        positionNumberList: jobs.map((job) => job.number),
      },
    };

    //작성 이벤트
    if (
      router.route.includes('edit') &&
      confirm('정말 글을 수정하시겠습니까?')
    ) {
      return submitEdit.mutate(data);
    }
    if (
      router.route.includes('create') &&
      confirm('정말 글을 작성하시겠습니까?')
    ) {
      return submitPost.mutate(data);
    }
  };

  return (
    <GridBox>
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
        <StacksBox
          stacks={stacks}
          onModal={onModal}
          selectStack={offModal}
          setStacks={setStacks}
          stack={stack}
        />
        <div className="want-box">
          <div className="title">모집을 원하는 직군</div>
          <div className="job-box">
            <select
              {...register('jobVal', { value: data && data.writerPosition })}
            >
              {POSITIONS.map((position) => (
                <option key={position} value={position}>
                  {position}
                </option>
              ))}
            </select>
            <select value={option} onChange={changeOption}>
              {optionArr.map((num) => (
                <option key={num} value={num}>
                  {num}명
                </option>
              ))}
            </select>
            <Btn onClick={addJob}>
              <span>+</span>
            </Btn>
          </div>
          <ul className="member-box">
            {jobs.map((job, i) => (
              <li className="nanum-regular member" key={`${job}+${i}`}>
                <div>{job.position}</div>
                <div>{job.number}명</div>
                <div className="delete">
                  <AiOutlineClose onClick={() => deleteJob(i)} fill="red" />
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
            position: data?.writerPosition!,
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

  .main-btn {
    min-width: 60px;

    > span {
      padding: 4px;
    }
  }

  .button-box {
    width: 100%;
    min-height: 13px;
    display: flex;
  }

  > div {
    margin-bottom: 32px;
    > div:first-child {
      font-family: var(--font-nanum);
      font-size: 15px;
      font-weight: 500;
    }
  }

  .noto-regular-13 {
    min-height: 13px;
    gap: 8px;
  }

  .want-box {
    width: 100%;
    padding: 0 30px;
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    justify-content: center;

    .title {
      margin-bottom: 10px;
    }

    > .member-box {
      display: flex;
      margin-top: 8px;
      flex-direction: column;
      width: 80%;
      > li {
        font-size: 13px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 8px;
        padding: 8px 0px;
        border-bottom: 1px solid #e4e4e7;
        > div:first-child {
          flex: 1;
          padding-left: 10px;
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
      justify-content: space-between;
      align-items: center;
      gap: 8px;
      width: 100%;
      > select {
        border: solid 2px #ececec;
        border-radius: 10px;
        padding: 8px;
        font-size: 13px;
        color: #7d7d7d;

        :focus {
          outline: none;
        }

        > option {
          color: #171717;

          :hover,
          :focus {
            background-color: #171717;
          }
        }
      }

      > button {
        width: 24px;
        height: 24px;
        background: #9b7aff;
        border: none;
        border-radius: 3px;
        color: white;
        cursor: pointer;
        transition: background 0.3s ease;

        :hover {
          background: #6333ff;
        }
      }
    }
  }

  input {
    width: 100%;
    padding: 10px;
    border: solid 2px #ececec;
    border-radius: 10px;
    color: #7d7d7d;

    :focus {
      background-color: white;
      outline: solid 2px #9b7aff;
    }

    ::placeholder {
      font-size: 13px;
      color: #a5a5a5;
    }
  }
`;
