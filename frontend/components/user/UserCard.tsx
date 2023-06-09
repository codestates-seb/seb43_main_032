import { AiFillStar } from 'react-icons/ai';
import styled from 'styled-components';
import Stack from '../stack/Stack';
import { User } from '@/types/user';
import Tag from '../Tag';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { loggedInUserId } from '@/recoil/selector';

interface IProps {
  user: User;
}
export default function UserCard({ user }: IProps) {
  const userId = useRecoilValue(loggedInUserId);
  const router = useRouter();

  const moveUserPage = () => {
    if (user.memberId === userId) {
      return router.push(`users/me`);
    }
    router.push(`users/${user.memberId}`);
  };
  return (
    <Group onClick={moveUserPage}>
      <Wrapper onClick={moveUserPage}>
        <Overlay />
        <CardWrapper>
          <SubCardWrapper>
            <ContentsContainer>
              <AvatarContainer>
                <img alt={user.name} src={user.profileImageUrl} />
              </AvatarContainer>
              <InfoContainer>
                <p style={{ fontWeight: '600' }}>{user.name}</p>
                <LocationAndStars>
                  <Tag className="tag">
                    <AiFillStar size={16} style={{ color: 'gold' }} />
                    <p>{user.totalStar}</p>
                  </Tag>
                </LocationAndStars>
              </InfoContainer>
            </ContentsContainer>
            <StackWrapper>
              {user.techList.length > 0 &&
                user.techList.map((stack) => (
                  <Stack
                    bubbleTop="62%"
                    position="static"
                    key={stack.tech}
                    tech={stack.tech}
                  />
                ))}
            </StackWrapper>
          </SubCardWrapper>
        </CardWrapper>
      </Wrapper>
    </Group>
  );
}

const Wrapper = styled.div`
  position: relative;
  cursor: pointer;
  padding: 10px;
  border-radius: 5px;
  width: 100%;
  border: solid 2px #ececec;

  @media (min-width: 768px) {
    border-radius: 20px;
  }
`;

const Overlay = styled.div`
  position: absolute;
  background-color: #9880e9;
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
  height: 100%;

  @media (max-width: 768px) {
    display: flex;
    border: solid 1px #ececec;
    border-radius: 10px;
  }

  @media (max-width: 360px) {
    border: solid 1px #ececec;
    border-radius: 10px;
  }
`;
const SubCardWrapper = styled.div`
  border-radius: 20px;
  background: white;
  overflow: hidden;
  padding-bottom: 20px;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 12px;
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
  justify-content: center;

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
  flex-direction: column;
  align-items: center;
  @media (max-width: 768px) {
  }
`;
const AvatarContainer = styled.div`
  display: flex;
  width: 60px;
  height: 60px;
  justify-content: center;
  overflow: hidden;
  border-radius: 50%;
  flex-shrink: 0;
  border: solid 2px #ececec;

  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
    border-radius: 100%;
  }
`;
const InfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  @media (min-width: 768px) {
    align-items: center;
    gap: 10px;
  }

  p {
    display: flex;
    justify-content: center;
  }
`;
const LocationAndStars = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 10px;
  justify-content: center;
  @media (min-width: 768px) {
    justify-content: center;
  }

  .tag {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
    background: none;
    color: #171717;
    border: solid 1px #ececec;
  }
`;

const Group = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  height: 257px;
  ${Wrapper}:hover ${Overlay} {
    opacity: 1;
  }

  @media (max-width: 768px) {
    height: 100%;
  }
`;
