import { Crew } from '@/types/project';
import styled from 'styled-components';
import { User } from '@/types/user';
import SubBtn from '../button/SubBtn';
import { useForm } from 'react-hook-form';
import { Form } from '@/types/types';
import { postStar } from '@/util/api/postStar';
import { confirmAlert } from '../alert/Alert';

const CrewItem = ({
  crew,
  userData,
}: {
  crew: Crew;
  userData: User[] | undefined;
}) => {
  const { register, watch } = useForm<Form>();
  const star = watch().star;
  const reviewEvent = () => {
    confirmAlert('정말 제출하시겠습니까?', '팀원 리뷰가').then(() =>
      postStar(crew.memberId, Number(star))
    );
  };
  const options = Array(10)
    .fill(1)
    .map((x, i) => x + i);
  const memberInfo = userData?.find((user) => user.memberId === crew.memberId);
  return (
    <Box>
      <div className="crew-profile">
        <div className="img-box">
          <img src={memberInfo?.profileImageUrl} alt="crew-img" />
        </div>
        <div className="name-box">{memberInfo?.name}</div>
        <div>
          <select {...register('star')}>
            {options.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="btn-box">
        <SubBtn onClick={reviewEvent}>제출</SubBtn>
      </div>
    </Box>
  );
};

export default CrewItem;

const Box = styled.li`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0px 28px;
  .crew-profile {
    display: flex;
    align-items: center;
    gap: 12px;
    @media (max-width: 960px) {
      font-size: 14px;
    }
  }
  .img-box {
    width: 24px;
    height: 24px;
    > img {
      width: 100%;
      height: 100%;
    }
  }
  .name-box {
    flex: 1;
  }
  .btn-box {
    display: flex;
    justify-content: center;
    button {
      padding: 4px;
    }
  }
`;
