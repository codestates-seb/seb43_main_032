import styled from 'styled-components';
import Tag from '../Tag';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const AvatarContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 150px;
  height: 150px;
  border-radius: 100%;
  margin: 10px;
  overflow: hidden;
  box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.25);
  -webkit-box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.25);
`;
const Name = styled.p.attrs({
  className: 'nanum-bold',
})`
  margin-top: 20px;
  margin-bottom: 5px;
`;
const StackWrapper = styled.div.attrs({})`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: 8px;
  margin-top: 20px;
  margin-bottom: 50px;
  color: white;
`;
const stacks = [
  'React',
  'Java',
  'Python',
  'C+',
  'TypeScript',
  'Styled-Components',
];
export default function UserInfoCard({ user }: { user: IUser }) {
  return (
    <Wrapper>
      <AvatarContainer>
        <img alt={user.NICK_NAME} src={user.PROFILE_IMAGE} />
      </AvatarContainer>
      <Tag>{`${user?.YEAR_OF_DEV} 년차`}</Tag>
      <Name>{user?.NICK_NAME}</Name>
      <p className="noto-regular-13">프론트엔드</p>
      <StackWrapper>
        {stacks.map((stack) => (
          <Tag key={`${stack}`}>{stack}</Tag>
        ))}
      </StackWrapper>
    </Wrapper>
  );
}
