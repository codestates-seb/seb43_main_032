import { dateDiffInDays, formatDate } from '@/util/date';
import styled from 'styled-components';

type Props = {
  start: Date | null | undefined;
  end: Date | null | undefined;
};

const Period = ({ start, end }: Props) => {
  return (
    <Box className="noto-regular-13">
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
    </Box>
  );
};

export default Period;

const Box = styled.div`
  display: flex;
  justify-content: center;
`;
