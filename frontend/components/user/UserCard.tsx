import { IUser } from '@/util/api/user';
import { AiFillStar } from 'react-icons/ai';
import { FaLocationArrow, FaNodeJs } from 'react-icons/fa';
import { FaReact } from 'react-icons/fa';
import { IoLogoCss3, IoLogoFirebase } from 'react-icons/io5';
import styled from 'styled-components';
import Tag from '../Tag';
import Link from 'next/link';
import Stack from '../stack/Stack';

const Wrapper = styled.div`
  position: relative;
  cursor: pointer;
  padding: 10px;
  border-radius: 5px;
  width: 100%;
  /* --tw-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.05),
    0 10px 10px -5px rgba(0, 0, 0, 0.05);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 transparent),
    var(--tw-ring-shadow, 0 0 transparent), var(--tw-shadow); */
`;
const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background-color: #f1f1f3;
  opacity: 0;
  transition: transform 0.3s ease-out, opacity 0.3s ease-out;
  border-radius: 5px;
`;
const CardWrapper = styled.div`
  position: relative;
`;
const StackWrapper = styled.ul`
  display: flex;
  gap: 4px;
  margin-top: 6px;
`;
const ContentsContainer = styled.div.attrs({
  className: 'nanum-regular',
})`
  font-size: 13px;
  display: flex;
  font-weight: 500;
  gap: 10px;
  padding-top: 10px;
`;
const AvatarContainer = styled.div`
  display: flex;
  width: 60px;
  height: 60px;
  justify-content: center;
  overflow: hidden;
  border-radius: 5px;
  flex-shrink: 0;
`;
const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
  /* @media screen and (min-width: 640px) {
    width: 49%; 
  }
  @media screen and (min-width: 960px) {
    width: 32%; 
  }
  @media screen and (min-width: 1280px) {
    width: 24%; 
  } */
  ${Wrapper}:hover ${Overlay} {
    opacity: 1;
  }
`;
interface IProps {
  user: IUser;
}
export default function UserCard({ user }: IProps) {
  return (
    <Group>
      <Link href={`users/${user.MEMBER_ID}`}>
        <Wrapper>
          <Overlay />
          <CardWrapper>
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
            <StackWrapper>
              {[
                'java_script',
                'react',
                'next_js',
                'recoil',
                'react_query',
                'type_scriypt',
              ].map((stack) => (
                <Stack skill={stack} />
              ))}
            </StackWrapper>
            <TagWrapper>
              {['react', 'js', 'recoil', 'firebase', 'TS'].map((stack) => (
                <Tag key={stack}>{stack}</Tag>
              ))}
            </TagWrapper>
          </CardWrapper>
        </Wrapper>
      </Link>
    </Group>
  );
}
