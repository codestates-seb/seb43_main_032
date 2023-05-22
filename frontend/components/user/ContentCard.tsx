import styled from 'styled-components';
import Tag from '../Tag';
import { AiFillStar } from 'react-icons/ai';

const stacks = [
  'React',
  'Java',
  'Python',
  'C+',
  'TypeScript',
  'Styled-Components',
];
export default function ContentCard() {
  return (
    <Wrapper>
      <ContentContainer>
        <CardInfo>
          <h3 style={{ fontSize: '20px', fontWeight: 'bold' }}>
            TODO List 만들기
          </h3>
          <span> 프로젝트 기간 : 2023.03.01 ~ 2023.03.02</span>
        </CardInfo>
        <TagContainer>
          {stacks.map((stack) => (
            <Tag key={stack}>{stack}</Tag>
          ))}
        </TagContainer>
        <span>
          Lorem ipsum dolor sit amet consectetur. Sit penatibus maecenas
          sollicitudin augue ac facilisi at varius tincidunt. Risus volutpat
          gravida a pharetra. Tortor semper ultrices.Lorem ipsum dolor sit amet
          consectetur. Sit penatibus maecenas sollicitudin augue ac facilisi at
          varius tincidunt. Risus volutpat gravida a pharetra. Tortor semper
          ultrices.
        </span>
      </ContentContainer>
      <StarRaiting>
        <AiFillStar size={30} />
        <p style={{ marginTop: '5px' }}>평점</p>
        <p>4/5</p>
      </StarRaiting>
    </Wrapper>
  );
}

const Wrapper = styled.div`
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
  gap: 8px;
  flex-wrap: wrap;
`;
const StarRaiting = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 20px;
`;
