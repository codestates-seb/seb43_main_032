import styled from 'styled-components';

const Tag = () => {
  return <TagBox />;
};

export default Tag;

const TagBox = styled.div`
  background-color: #d9d9d9;
  padding: 5px;
  border-radius: var(--radius-sm);
  min-width: 48px;
  text-align: center;
  margin-right: 8px;
`;
