import GridBox from '@/components/GridBox';
import styled from 'styled-components';
import { BsFillCalendarEventFill } from 'react-icons/bs';
import DatePicker, {
  ReactDatePickerProps,
  registerLocale,
} from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ko from 'date-fns/locale/ko'; // 한국어적용
import { ForwardedRef, forwardRef, useState } from 'react';
import { formatDate } from '@/util/date/formatDate';
import { dateDiffInDays } from '@/util/date/dateDiffInDays';
import Tag from '@/components/Tag';
import useForm from '@/hooks/useForm';
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

  const { data, handleChange, errors, handleSubmit } = useForm({
    initialValues: {
      tag: {},
      stack: {},
      job: {},
    },
    validations: {
      tag: {
        required: {
          value: true,
          message: 'you need to require tag',
        },
      },
      stack: {
        required: {
          value: true,
          message: 'you need to require stack',
        },
      },
      job: {
        required: {
          value: true,
          message: 'you need to require job',
        },
      },
    },
    // onSubmit: handleSignUpSubmit,
  });

  // function handleSignUpSubmit() {
  //   signup.mutate();
  // }

  return (
    <GridBox>
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
          <ul className="noto-regular-13">
            <li className="button-box">
              <button>태그 등록</button>
            </li>
            {/* <li>
              <Tag>금융</Tag>
            </li>
            <li>
              <Tag>Ai</Tag>
            </li> */}
          </ul>
        </div>
        <div className="stack-box">
          <div>프로젝트 메인 스택</div>
          <ul className="noto-regular-13">
            <li className="button-box">
              <button>스택 등록</button>
            </li>
            {/* <li className="bg-java_script"></li>
            <li className="bg-css"></li>
            <li className="bg-html"></li> */}
          </ul>
        </div>
        <div className="want-box">
          <div>모집을 원하는 직군</div>
          <ul className="noto-regular-13">
            <li className="button-box">
              <button>직군 등록</button>
            </li>
            {/* <li>
              <div>프론트엔드</div>
              <div>1명</div>
            </li>
            <li>
              <div>백엔드</div>
              <div>3명</div>
            </li>
            <li>
              <div>디자이너</div>
              <div>2명</div>
            </li> */}
          </ul>
        </div>
      </Side>
      <Main>
        <div className="post-box">
          <div className="project-status-box noto-regular-12">시작 전</div>
          <div className="noto-regular-13">
            작성일자 : 2023년 4월 1일 조회수 : 27 댓글수 : 27개
          </div>
          <div className="post">
            <div></div>
          </div>
        </div>
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
    padding: 8px 32px;
    border-radius: var(--radius-def);
  }

  .button-box {
    width: 100%;
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

  .tag-box,
  .stack-box {
    > ul {
      display: flex;
    }
  }

  .want-box {
    > ul {
      > li {
        display: flex;
        align-items: center;
        margin-bottom: 24px;
        gap: 8px;
        > div:first-child {
          flex: 1;
        }
      }
    }

    /* .light {
      width: 20px;
      height: 20px;
      border-radius: 50%;
    }

    .green {
      background-color: #94f184;
    }

    .red {
      background-color: #ff7171;
    } */

    .tag {
      cursor: pointer;
    }
  }

  .review-box {
  }
`;
const Main = styled.div`
  border: 1px solid black;
  padding: var(--padding-2);
  .post-box {
    width: 100%;
    border: 1px solid black;
    border-radius: var(--radius-def);

    > div {
      padding: var(--padding-2);
    }
  }

  .project-status-box {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .post {
    width: 100%;
    display: flex;
    justify-content: end;
    > div {
      width: 90%;
      border: 1px solid black;
      background-color: var(--bg-gray);
      min-height: 60vh;
    }
  }
`;
