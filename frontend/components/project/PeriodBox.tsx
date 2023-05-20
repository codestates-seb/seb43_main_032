import DatePicker, {
  ReactDatePickerProps,
  registerLocale,
} from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ForwardedRef, forwardRef } from 'react';
import { BsFillCalendarEventFill } from 'react-icons/bs';
import styled from 'styled-components';
import { dateDiffInDays, formatDate } from '@/util/date';
import ko from 'date-fns/locale/ko'; // 한국어적용
registerLocale('ko', ko); // 한국어적용

type Props = {
  start: Date | null | undefined;
  end: Date | null | undefined;
  handleRangeChange?: (dates: [Date | null, Date | null]) => void;
};

const PeriodBox = ({ start, end, handleRangeChange }: Props) => {
  interface Props extends Omit<ReactDatePickerProps, 'onChange'> {
    onClick(): void;
  }
  //달력 커스텀
  const CustomInput = forwardRef(
    ({ onClick }: Props, ref: ForwardedRef<HTMLSpanElement>) => (
      <span onClick={onClick} ref={ref} className="calendar-icon">
        <BsFillCalendarEventFill />
      </span>
    )
  );

  return (
    <Box>
      <div>
        <div className="title">프로젝트 기간</div>
        {handleRangeChange && (
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
        )}
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
    </Box>
  );
};

export default PeriodBox;

const Box = styled.div`
  width: 100%;
  padding: 0 30px;
  > div:first-child {
    display: flex;
    align-items: start;

    > .title {
      font-size: 15px;
      margin-bottom: 10px;
      font-weight: 500;
    }
  }
  .calendar-box {
    margin-left: 16px;
    cursor: pointer;

    .calendar-icon {
      font-size: 15px;
      vertical-align: top;
      color: #9b7aff;
      transition: all 0.3s ease;
    }

    :hover {
      span {
        color: #6333ff;
      }
    }
  }
  .react-datepicker__triangle {
    ::before,
    ::after {
      top: 3px;
      left: -3px;
      transform: rotate(-2deg);
    }
  }
  > .period {
    padding: 10px;
    border: solid 2px #ececec;
    border-radius: 10px;
    color: #a5a5a5;
    min-height: 39px;
  }
`;
