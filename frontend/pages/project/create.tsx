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
  useRef,
  useState,
} from 'react';
import { formatDate } from '@/util/date/formatDate';
import { dateDiffInDays } from '@/util/date/dateDiffInDays';
import Tag from '@/components/Tag';
import SelectStack from '@/components/SelectStack';
import dynamic from 'next/dynamic';
import SelectedStacks from '@/components/project/SelectedStacks';
import { api } from '@/util/api';
import { useRouter } from 'next/router';
import EiditorSkeleton from '@/components/EiditorSkeleton';
const Editor = dynamic(() => import('@/components/Editor'), {
  ssr: false,
  loading: () => <EiditorSkeleton />,
});
registerLocale('ko', ko); // 한국어적용
interface Props extends Omit<ReactDatePickerProps, 'onChange'> {
  onClick(): void;
}

//프로젝트 글 작성 페이지 입니다. 경로 '/project/create/'
const CreateProject = () => {
  const router = useRouter();
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

  //태그 input
  const tagInput = useRef<HTMLInputElement>(null);
  //해시태그 값 상태
  const [tags, setTags] = useState<string[]>([]);
  const [tagVal, setTagVal] = useState('');

  //태그 input 이벤트
  const changeTagVal = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== ' ') setTagVal(e.target.value);
  };

  //해시태그 키 다운
  const tagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Enter' || e.key === ' ') && tagVal !== '') {
      addTag(tagVal);
      setTagVal('');
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
  const [jobVal, setJobVal] = useState('');
  const changeJobVal = (e: ChangeEvent<HTMLInputElement>) => {
    setJobVal(e.target.value);
  };
  const jobKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && jobVal !== '') {
      setJob([...job, { [jobVal]: option }]);
      setJobVal('');
      setOption(1);
    } else if (e.key === 'Enter' && jobVal === '') {
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
    if (jobVal === '') {
      return setWarning(true);
    }
    setJob([...job, { [jobVal]: option }]);
    setJobVal('');
    setOption(1);
  };
  const jobs = job.map((x) => Object.keys(x)[0]);
  const jobCount = job.map((x) => Object.values(x)[0]);

  //나의 포지션
  const [position, setPosition] = useState('');
  const changePosition = (e: ChangeEvent<HTMLInputElement>) => {
    setPosition(e.target.value);
  };

  //form 타이틀
  const [formTitle, setFormTitle] = useState('');
  const changeFormTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setFormTitle(e.target.value);
  };

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
    if (formTitle === '') {
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
      position,
      formTitle,
      editor,
    };
    api.post('/project', data).then(() => router.push('/'));
  };

  return (
    <>
      <SubmitBox>
        <button onClick={postProject} className="nanum-bold">
          작성 완료
        </button>
      </SubmitBox>
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
            <div className="noto-regular-13 period">
              <span>{start && formatDate(start)}</span>
              {start && <span> ~ </span>}
              <span>{end && formatDate(end)} </span>
              <span>
                {start
                  ? end
                    ? `(${dateDiffInDays(start, end)}일)`
                    : '종료일 미정'
                  : ''}
              </span>
            </div>
          </div>
          <div className="tag-box">
            <div>프로젝트 분야 태그</div>
            <div className="noto-regular-13">
              <div className="button-box">
                <input
                  ref={tagInput}
                  value={tagVal}
                  onKeyDown={tagKeyDown}
                  onChange={changeTagVal}
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
                onChange={changeJobVal}
                value={jobVal}
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
        <Main>
          <div className="explanation-box">
            <div className="nanum-bold title">
              모집 글 작성은 이렇게 해주세요.
            </div>
            <div className="sub">
              무슨 프로젝트를 계획하고 구상했는지, 그리고 어떤 계획으로 진행할
              것인지 최대한 상세히 적어주세요.
            </div>
            <div>
              <ul>
                <li>
                  기간, 태그, 스택, 직군들을 상세하게 기입해주시면 좋아요.
                </li>
                <li>
                  간략하게 작성하기보다는 최대한 자세하게 적어주시면 좋아요.
                </li>
                <li>중요한 내용들은 임팩트를 주시면 좋아요.</li>
              </ul>
            </div>
          </div>
          <form action="#">
            <div className="nanum-bold">
              <div>나의 포지션</div>
              <div>
                <input
                  value={position}
                  onChange={changePosition}
                  type="text"
                  placeholder="포지션을 입력해주세요."
                />
              </div>
            </div>
            <div className="title">
              <input
                placeholder="제목을 등록해주세요."
                type="text"
                value={formTitle}
                onChange={changeFormTitle}
              />
            </div>
            <div>
              <Editor changeEditor={changeEditor} />
            </div>
          </form>
        </Main>
      </GridBox>
    </>
  );
};

export default CreateProject;

const SubmitBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  padding: var(--padding-2);
  button {
    cursor: pointer;
    border: none;
    padding: 8px 32px;
    border-radius: var(--radius-def);
    font-size: 18px;
    font-weight: 700;
    :hover {
      background-color: #e1e7e5;
    }
  }
`;

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

  .period {
    display: flex;
    justify-content: center;
  }

  .stack-box {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
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
