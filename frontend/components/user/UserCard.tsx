import { AiFillStar } from 'react-icons/ai';
import { FaLocationArrow } from 'react-icons/fa';
import styled from 'styled-components';
import Link from 'next/link';
import Stack from '../stack/Stack';
import { User } from '@/types/user';
import Tag from '../Tag';
interface IProps {
  user: User;
}
export default function UserCard({ user }: IProps) {
  return (
    <Group>
      <Link href={`users/${user.memberId}`}>
        <Wrapper>
          <Overlay />
          <CardWrapper>
            <SubCardWrapper>
              <ContentsContainer>
                <AvatarContainer>
                  {user.profileImageUrl ? (
                    <img alt={user.name} src={user.profileImageUrl} />
                  ) : (
                    <img
                      alt={user.name}
                      src="https://pbs.twimg.com/media/FmynZRjWYAgEEpL.jpg"
                    />
                  )}
                </AvatarContainer>
                <InfoContainer>
                  <p style={{ fontWeight: '600' }}>{user.name}</p>
                  <LocationAndStars>
                    <Tag className="tag">
                      <AiFillStar size={20} style={{ color: 'gold' }} />
                      <p>{user.totalStar}</p>
                    </Tag>
                  </LocationAndStars>
                </InfoContainer>
              </ContentsContainer>
              <StackWrapper>
                {user.techList.length > 0 &&
                  user.techList.map((stack) => (
                    <Stack key={stack.tech} tech={stack.tech} />
                  ))}
              </StackWrapper>
            </SubCardWrapper>
            <CardFooter>
              <AboutMe>{user.aboutMe}</AboutMe>
            </CardFooter>
          </CardWrapper>
        </Wrapper>
      </Link>
    </Group>
  );
}

const Wrapper = styled.div`
  position: relative;
  cursor: pointer;
  padding: 10px;
  border-radius: 5px;
  width: 100%;

  @media (min-width: 768px) {
    border-radius: 20px;
    border: solid 2px #ececec;
  }
`;
const Overlay = styled.div`
  position: absolute;
  background-color: #f1f1f3;
  opacity: 0;
  transition: transform 0.3s ease-out, opacity 0.3s ease-out;
  border-radius: 5px;

  inset: 0 -50px;
  @media (min-width: 768px) {
    border-radius: 20px;
    inset: 0;
  }
`;
const CardWrapper = styled.div`
  position: relative;
  @media (max-width: 768px) {
    display: flex;
  }
`;
const SubCardWrapper = styled.div`
  border-radius: 20px;
  background: white;
  overflow: hidden;
  padding-bottom: 20px;
  @media (max-width: 768px) {
    display: flex;
    width: 100%;
  }
`;
//유저 카드는 스택hover가 작동할 수 없는 구조로 변경되었습니다.
const StackWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  height: 24px;
  margin-top: 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (min-width: 768px) {
    justify-content: center;
  }
`;
const ContentsContainer = styled.div.attrs({
  className: 'nanum-regular',
})`
  font-size: 15px;
  display: flex;
  font-weight: 500;
  gap: 10px;
  padding-top: 10px;

  @media (min-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;
const AvatarContainer = styled.div`
  display: flex;
  width: 60px;
  height: 60px;
  justify-content: center;
  overflow: hidden;
  border-radius: 5px;
  flex-shrink: 0;
  border: solid 2px #ececec;

  @media (min-width: 768px) {
    width: 100px;
    height: 100px;
    border-radius: 100%;
  }
`;
const InfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (min-width: 768px) {
    align-items: center;
    gap: 10px;
  }
`;
const LocationAndStars = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-bottom: 10px;
  @media (min-width: 768px) {
    display: flex;
  }

  .tag {
    display: flex;
    align-items: center;
    gap: 4px;
    background: #b5b5b5;
    color: white;
  }
`;

const CardFooter = styled.div.attrs({
  className: 'noto-regular',
})`
  border-top: solid 1px #ececec;
  font-size: 13px;
  padding: 10px;
  height: 38px;
  @media (max-width: 768px) {
    display: none;
  }
`;
const AboutMe = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  height: 29px;
  text-overflow: ellipsis;
  line-height: 1.2;
  max-height: calc(1.2 * 3); /* line-height * 줄 수 */
`;
const Group = styled.div`
  display: flex;
  width: 100%;
  ${Wrapper}:hover ${Overlay} {
    opacity: 1;
  }
`;
