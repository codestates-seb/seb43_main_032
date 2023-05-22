import { AiFillStar } from 'react-icons/ai';
import { FaLocationArrow } from 'react-icons/fa';
import styled from 'styled-components';
import Link from 'next/link';
import Stack from '../stack/Stack';
import { UserState } from '@/types/user';
import Tag from '../Tag';

interface IProps {
  user: UserState;
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
                      <FaLocationArrow />
                      <p>Seoul</p>
                    </Tag>
                    <Tag className="tag">
                      <AiFillStar size={20} style={{ color: 'gold' }} />
                      <p>{123}</p>
                    </Tag>
                  </LocationAndStars>
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
                  <Stack key={stack} tech={stack} />
                ))}
              </StackWrapper>
            </SubCardWrapper>
            <CardFooter>
              <AboutMe>
                다양한 지식을 두루 섭렵하기 위한 노력을 게을리하지 않았고, 이는
                새로운 사람과 공통 화제를 찾는 데 큰 도움이 되었습니다. 다양한
                방면에 잡지식이 많아 어떠한 주제에도 공감할 수 있기 때문입니다.
                이러한 능력에 밝고 쾌활한 성격이 더해진 덕분에 저는 많은 사람과
                좋은 관계를 유지할 수 있었습니다. 성실한 성격입니다. 제게 맡겨진
                일은 책임감을 가지고 성공적인 결과를 낼 수 있도록 최선을 다하는
                성격입니다. 이것은 저의 가장 큰 장점이기도 하지만 때로는 제게
                단점으로 작용하기도 합니다. 한번 마음먹은 일은 완벽하게 해내야
                한다는 생각에 건강을 해치는 경우가 생기기 때문입니다. 팀 과제를
                실시하면서 감기몸살에 걸린 일이 있었는데 대수롭지 않게 넘기고
                관리에 소홀하여 큰 병으로 번져 근 한 달간을 병원 신세를 져야
                했습니다. 그때 저는 생각했습니다. 건강보다 중요한 것은 없다는
                것을 새삼 깨닫게 된 경험이었습니다. 그 이후 저는 건강을
                중요시하는 마음으로 생활하고 있습니다. 성실하게 일하되 절대
                무리하지 않기 위해서는 효율적인 업무 능력이 필요하다고
                생각합니다. 성실하고 빠른 업무 처리 능력을 인정받을 수 있도록
                최선을 다하여 능력을 계발하겠습니다.
              </AboutMe>
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
`;
const StackWrapper = styled.ul`
  display: flex;
  gap: 4px;
  margin-top: 6px;

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

  @media (min-width: 768px) {
    width: 100px;
    height: 100px;
    border-radius: 100%;
    background-color: skyblue;
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
  }
`;

const CardFooter = styled.div.attrs({
  className: 'noto-regular',
})`
  border-top: solid 1px #ececec;
  font-size: 13px;
  display: flex;
  padding: 20px;
  @media (max-width: 768px) {
    /* display: none; */
  }
`;
const AboutMe = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2;
  max-height: calc(1.2 * 3); /* line-height * 줄 수 */
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
