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
          <div className="noto-regular-13">
            <span>{start && formatDate(start)}</span>
            {start && <span> ~ </span>}
            <span>{end && formatDate(end)}</span>
            <span></span>
          </div>
        </div>
        <div className="tag-box">
          <div>프로젝트 분야 태그</div>
          <ul className="noto-regular-13">
            <li>금융</li>
            <li>AI</li>
          </ul>
        </div>
        <div className="stack-box">
          <div>프로젝트 메인 스택</div>
          <ul className="noto-regular-13">
            <li>리액트</li>
            <li>js</li>
            <li>css</li>
            <li>html</li>
          </ul>
        </div>
        <div className="want-box">
          <div>모집을 원하는 직군</div>
          <ul className="noto-regular-13">
            <li>프론트</li>
            <li>백엔드</li>
            <li>디자이너</li>
            <li>기획자</li>
          </ul>
        </div>
      </Side>
      <Main>메인</Main>
    </GridBox>
  );
};

export default CreateProject;

const Side = styled.div`
  width: 100%;
  background-color: var(--bg-gray);
  padding: var(--padding);
  > div {
    margin-bottom: 32px;
    > div:first-child {
      font-family: var(--font-nanum);
      font-size: 23px;
      font-weight: 700;
      margin-bottom: 24px;
    }
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

  .tag-box {
    > ul {
      display: flex;
    }
  }

  .stack-box {
    > ul {
      display: flex;
    }
  }

  .want-box {
    > ul {
      > li {
        margin-bottom: 24px;
      }
    }
  }
`;
const Main = styled.div`
  border: 1px solid black;
`;
