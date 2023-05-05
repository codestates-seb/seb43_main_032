import useUser from '@/hooks/useUser';
import { IUser } from '@/util/api/user';
import { AiFillStar } from 'react-icons/ai';
import { FaLocationArrow, FaNodeJs } from 'react-icons/fa';
import { FaReact } from 'react-icons/fa';
import { IoLogoCss3, IoLogoFirebase } from 'react-icons/io5';
import styled from 'styled-components';
import Tag from '../Tag';

const Wrapper = styled.div`
  position: relative;
  padding: 10px;
  border-radius: 5px;
  width: 100%;
  /* background-color: teal; */
  --tw-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.01);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 transparent),
    var(--tw-ring-shadow, 0 0 transparent), var(--tw-shadow);
`;
const Overlay = styled.div`
  position: absolute;
  inset: 0;
  /* z-index: 0; */
  background-color: #f1f1f3;
  opacity: 0;
  transition: transform 0.3s ease-out, opacity 0.3s ease-out;
  transform-origin: center;
  border-radius: 5px;
  /* --tw-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 transparent),
    var(--tw-ring-shadow, 0 0 transparent), var(--tw-shadow); */
`;
const CardWrapper = styled.div`
  position: relative;
`;
const StackWrapper = styled.div``;
const ContentsContainer = styled.div.attrs({
  className: 'nanum-regular',
})`
  display: flex;
  font-weight: 500;
  gap: 10px;
  padding-top: 10px;
`;
const AvatarContainer = styled.div`
  display: flex;
  width: 70px;
  height: 70px;
  justify-content: center;
  overflow: hidden;
  border-radius: 5px;
  flex-shrink: 0;
`;
const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;
const Location = styled.div`
  display: flex;
  gap: 10px;
`;
const Star = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;
const TagWrapper = styled.div`
  display: flex;
  margin-top: 10px;
  gap: 5px;
  flex-wrap: wrap;
`;
const Group = styled.div`
  display: flex;
  width: 100%;
  @media screen and (min-width: 640px) {
    width: 45%; /* 640px 이상일 때는 40%로 설정 */
  }

  @media screen and (min-width: 960px) {
    width: 30%; /* 748px 이상일 때는 30%로 설정 */
  }
  @media screen and (min-width: 1280px) {
    width: 22%; /* 748px 이상일 때는 30%로 설정 */
  }
  ${Wrapper}:hover ${Overlay} {
    opacity: 1;
    scale: 1;
  }
`;
interface IProps {
  user: IUser;
}
export default function UserCard({ user }: IProps) {
  console.log(user);
  return (
    <Group>
      <Wrapper>
        <Overlay />
        <CardWrapper>
          <StackWrapper>
            <IoLogoFirebase size={30} style={{ color: 'orange' }} />
            <FaReact size={30} style={{ color: 'skyblue' }} />
            <FaNodeJs size={30} />
            <IoLogoCss3 size={30} style={{ color: 'orange' }} />
          </StackWrapper>
          <ContentsContainer>
            <AvatarContainer>
              <img alt={user.NICK_NAME} src={user.PROFILE_IMAGE} />
            </AvatarContainer>
            <InfoContainer>
              <p style={{ fontWeight: '600' }}>{user.NICK_NAME}</p>
              <Location>
                <FaLocationArrow />
                <p>Seoul</p>
              </Location>
              <Star>
                <AiFillStar size={20} style={{ color: 'gold' }} />
                <p>{123}</p>
              </Star>
            </InfoContainer>
          </ContentsContainer>
          <TagWrapper>
            {['react', 'js', 'recoil', 'firebase', 'TS'].map((stack) => (
              <Tag>{stack}</Tag>
            ))}
          </TagWrapper>
        </CardWrapper>
      </Wrapper>
    </Group>
  );
}
