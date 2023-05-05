import GridBox from '@/components/GridBox';
import styled from 'styled-components';
import { BsFillCalendarEventFill } from 'react-icons/bs';
import { GrFormClose } from 'react-icons/gr';
import DatePicker, {
  ReactDatePickerProps,
  registerLocale,
} from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ko from 'date-fns/locale/ko'; // 한국어적용
import {
  ChangeEvent,
  ForwardedRef,
  forwardRef,
  useEffect,
  useState,
} from 'react';
import Tag from '@/components/Tag';
import SelectStack from '@/components/stack/SelectStack';
import SelectedStacks from '@/components/stack/SelectedStacks';
import { api } from '@/util/api';
import { useRouter } from 'next/router';
import MainPost from '@/components/MainPost';
import { useForm } from 'react-hook-form';
import { DefaultObj } from '@/types/types';
import PostBtn from '@/components/PostBtn';
import Period from '@/components/project/Period';
registerLocale('ko', ko); // 한국어적용
interface Props extends Omit<ReactDatePickerProps, 'onChange'> {
  onClick(): void;
}

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

  //달력 커스텀
  const CustomInput = forwardRef(
    ({ onClick }: Props, ref: ForwardedRef<HTMLSpanElement>) => (
      <span onClick={onClick} ref={ref}>
        <BsFillCalendarEventFill />
      </span>
    )
  );

  //스택 모달 관련
  const [stack, setStack] = useState(false);
  const onModal = () => {
    setStack(true);
  };
  const offModal = () => {
    setStack(false);
  };

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

  // 해시태그 중복 삭제
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
  const jobs = job.map((x) => Object.keys(x)[0]);
  const jobCount = job.map((x) => Object.values(x)[0]);

  //에디터 상태
  const [editor, setEditor] = useState('');
  const changeEditor = (value: string) => {
    setEditor(value);
  };

  //프로젝트 글 완료 이벤트
  const postProject = () => {
    if (!start) {
      return alert('프로젝트 기간을 설정해주세요.');
    }
    if (job.length === 0) {
      return alert('모집 직군은 최소 1개 이상 등록해주세요.');
    }
    if (watch().title === '') {
      return alert('제목을 입력해주세요.');
    }
    if (editor === '') {
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
      editor,
    };
    api.post('/project', data).then(() => router.push('/'));
  };

  return (
    <>
      <PostBtn postEvent={postProject} />
      <GridBox>
        {stack && (
          <SelectStack
            offModal={offModal}
            select={select}
            setSelect={setSelect}
          />
        )}
        <Side warning={warning}>
          <div className="period-box">
            <div>
              <div>프로젝트 기간</div>
              <div className="calendar-box">
                <DatePicker
                  selected={start}
                  onChange={handleRangeChange}
                  locale={ko}
                  startDate={start}
                  endDate={end}
                  selectsRange
                  customInput={
                    <CustomInput
                      onClick={function (): void {
                        throw new Error('Function not implemented.');
                      }}
                    />
                  }
                />
              </div>
            </div>
            <Period start={start} end={end} />
          </div>
          <div className="tag-box">
            <div>프로젝트 분야 태그</div>
            <div className="noto-regular-13">
              <div className="button-box">
                <input
                  {...register('tagVal')}
                  onKeyDown={tagKeyDown}
                  type="text"
                />
              </div>
              <ul>
                {tags.map((x, i) => (
                  <li key={`${x}+${i}`}>
                    <Tag>
                      <div>{x}</div>
                      <div>
                        <GrFormClose onClick={() => deleteTag(i)} />
                      </div>
                    </Tag>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="stack-box">
            <div>프로젝트 메인 스택</div>
            <ul className="noto-regular-13">
              <li className="button-box">
                {select.length === 0 ? (
                  <button onClick={onModal}>스택 등록</button>
                ) : (
                  <SelectedStacks onModal={onModal} select={select} />
                )}
              </li>
            </ul>
          </div>
          <div className="want-box">
            <div>모집을 원하는 직군</div>
            <div className="job-box">
              <input
                type="text"
                {...register('jobVal')}
                onKeyDown={jobKeyDown}
              />
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
                </li>
              ))}
            </ul>
          </div>
        </Side>
        <MainPost type={1} register={register} changeEditor={changeEditor} />
      </GridBox>
    </>
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

  ul {
    display: flex;
    flex-wrap: wrap;
  }

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

  .period-box {
    > div:first-child {
      display: flex;
    }
    .calendar-box {
      margin-left: 16px;
      cursor: pointer;
    }
    .react-datepicker__triangle {
      ::before,
      ::after {
        top: 3px;
        left: -3px;
        transform: rotate(-2deg);
      }
    }
  }

  .stack-box {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    > ul {
      cursor: pointer;
    }
    .select-tag-box {
      display: flex;
      justify-content: center;
      gap: 8px;
      > li {
        box-shadow: var(--box-shadow);
      }
    }
  }

  .tag-box {
    display: flex;
    align-items: center;
    flex-direction: column;
    ul {
      justify-content: center;
      gap: 4px;
      flex-direction: row;
      li {
        > div {
          display: flex;
          gap: 4px;
          min-width: auto;
          > div:last-child {
            cursor: pointer;
          }
        }
      }
    }

    .button-box {
      margin-bottom: 12px;
    }
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

    .tag {
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
