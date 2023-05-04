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
registerLocale('ko', ko); // 한국어적용
interface Props extends Omit<ReactDatePickerProps, 'onChange'> {
  onClick(): void;
}

//프로젝트 글 작성 페이지 입니다. 경로 '/project/create/'
const CreateProject = () => {
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
  const inputRef = useRef<HTMLInputElement>(null);
  //해시태그 값 상태
  const [tags, setTags] = useState<string[]>([]);
  const [inputVal, setInputVal] = useState('');

  //태그 input 이벤트
  const changeInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== ' ') setInputVal(e.target.value);
  };

  //해시태그 키 다운
  const inputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Enter' || e.key === ' ') && inputVal !== '') {
      addTag(inputVal);
      setInputVal('');
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

  return (
    <GridBox>
      {stack && (
        <SelectStack
          offModal={offModal}
          select={select}
          setSelect={setSelect}
        />
      )}
      <Side>
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
                ref={inputRef}
                value={inputVal}
                onKeyDown={inputKeyDown}
                onChange={changeInput}
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
                <ul onClick={onModal} className="select-tag-box">
                  {select.map((x) => (
                    <li key={x} className={`bg-${x}`}></li>
                  ))}
                </ul>
              )}
            </li>
          </ul>
        </div>
        <div className="want-box">
          <div>모집을 원하는 직군</div>
          <ul className="noto-regular-13">
            <li className="button-box">
              <button>직군 등록</button>
            </li>
          </ul>
        </div>
      </Side>
      <Main>
        <div className="post-box"></div>
      </Main>
    </GridBox>
  );
};

export default CreateProject;

const Side = styled.div`
  width: 100%;
  padding: var(--padding-1);
  display: flex;
  align-items: center;
  flex-direction: column;

  button {
    cursor: pointer;
    border: none;
    height: 40px;
    padding: 8px 32px;
    border-radius: var(--radius-def);
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
    flex-direction: column;
    .select-tag-box {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
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
      margin-left: 32px;
      display: flex;
      gap: 4px;
      flex-wrap: wrap;
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
    > ul {
      > li {
        display: flex;
        align-items: center;

        gap: 8px;
        > div:first-child {
          flex: 1;
        }
      }
    }

    .tag {
      cursor: pointer;
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
const Main = styled.div`
  border: 1px solid black;
  padding: var(--padding-2);
  .post-box {
    width: 100%;
    border: 1px solid black;
    border-radius: var(--radius-def);
  }
`;
