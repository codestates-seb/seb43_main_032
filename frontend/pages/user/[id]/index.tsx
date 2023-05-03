import GridBox from '@/components/GridBox';
import Tag from '@/components/Tag';
import styled from 'styled-components';
import { AiFillStar } from 'react-icons/ai';

//마이 페이지 입니다. 경로 '/user/[id]'  예시 >>  /user/1
const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  padding-top: 100px;
  background-color: rgba(0, 0, 0, 0.1);
`;
const ContentsContainer = styled.div`
  width: 100%;
  padding-top: 20px;
  background-color: rgba(0, 0, 0, 0.1);
`;
const AvatarContainer = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 100%;
  background-color: gray;
  margin: 10px;
`;
const Name = styled.p`
  margin-top: 20px;
  margin-bottom: 5px;
`;
const StackWrapper = styled.div.attrs({})`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: 10px 0;
  margin-top: 20px;
  margin-bottom: 50px;
  color: white;
`;
const Button = styled.button`
  width: 100%;
  height: 50px;
  border-radius: var(--radius-sm);
  margin-bottom: 10px;
  background-color: #d9d9d9;
  border: none;
  cursor: pointer;
`;

const UserDescription = styled.div`
  width: 100%;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: var(--radius-def);
  background-color: rgba(0, 0, 0, 0.2);
`;
const ContentTitle = styled.h2.attrs({
  className: 'nanum-bold',
})`
  padding-bottom: 20px;
`;
const Contents = styled.div`
  padding: 20px;
  border-radius: var(--radius-def);
  background-color: rgba(0, 0, 0, 0.2);
`;
const Category = styled.div.attrs({
  className: 'noto-medium',
})`
  padding: 20px;
  padding-bottom: 10px;
`;
//Card
const ContentCard = styled.div`
  display: flex;
  padding: 20px;
  margin-bottom: 20px;
  justify-content: space-between;
  align-items: center;
  border-radius: var(--radius-def);
  background-color: rgba(0, 0, 0, 0.3);
`;
const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const CardInfo = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;
const TagContainer = styled.div`
  padding: 10px;
  padding-left: 0;
  display: flex;
  gap: 5px 0;
  flex-wrap: wrap;
`;
const StarRaiting = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 20px;
`;
//Card
const stacks = [
  'React',
  'Java',
  'Python',
  'C+',
  'TypeScript',
  'Styled-Components',
];
const MyPage = () => {
  return (
    <GridBox>
      <UserInfoContainer>
        <AvatarContainer />
        <Tag>1년차</Tag>
        <Name className="nanum-bold">유저닉네임</Name>
        <p className="nanum-regular">프론트엔드 / 백엔드</p>
        <StackWrapper>
          {Array.from({ length: 3 }, () =>
            stacks.map((stack) => <Tag>{stack}</Tag>)
          )}
        </StackWrapper>
        <Button>메일 보내기</Button>
        <Button>채팅하기</Button>
      </UserInfoContainer>
      <ContentsContainer>
        <UserDescription>
          <ContentTitle>자기 소개란</ContentTitle>
          <span>
            Lorem ipsum dolor sit amet consectetur. Amet enim egestas nec
            sollicitudin aliquam. Amet non a accumsan faucibus. Id ultrices
            vulputate sed elementum quis at. Odio condimentum morbi sit viverra
            dui sit. Vel dolor ultrices nam eget nibh cursus facilisis pretium
            egestas. Ornare a elementum sed vel amet mattis. Arcu donec aliquam
            volutpat ut consectetur. Mi ullamcorper dui id molestie leo lectus
            lectus. Vitae montes blandit ullamcorper enim sem blandit integer.
          </span>
        </UserDescription>
        <Category>프로젝트 | 게시글 | 댓글 </Category>
        <Contents>
          <ContentTitle>참여 프로젝트</ContentTitle>
          {/* contentCard */}
          {Array.from({ length: 5 }, () => (
            <ContentCard>
              <ContentContainer>
                <CardInfo>
                  <h3 style={{ fontSize: '20px', fontWeight: 'bold' }}>
                    TODO List 만들기
                  </h3>
                  <span> 프로젝트 기간 : 2023.03.01 ~ 2023.03.02</span>
                </CardInfo>
                <TagContainer>
                  {stacks.map((stack) => (
                    <Tag>{stack}</Tag>
                  ))}
                </TagContainer>
                <span>
                  Lorem ipsum dolor sit amet consectetur. Sit penatibus maecenas
                  sollicitudin augue ac facilisi at varius tincidunt. Risus
                  volutpat gravida a pharetra. Tortor semper ultrices.Lorem
                  ipsum dolor sit amet consectetur. Sit penatibus maecenas
                  sollicitudin augue ac facilisi at varius tincidunt. Risus
                  volutpat gravida a pharetra. Tortor semper ultrices.
                </span>
              </ContentContainer>
              <StarRaiting>
                <AiFillStar size={30} />
                <p style={{ marginTop: '5px' }}>평점</p>
                <p>4/5</p>
              </StarRaiting>
            </ContentCard>
          ))}

          {/* contentCard */}
        </Contents>
      </ContentsContainer>
    </GridBox>
  );
};

export default MyPage;
