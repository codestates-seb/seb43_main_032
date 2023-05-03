import styled from 'styled-components';

const SelectStack = () => {
  return (
    <Box>
      <div className="title nanum-bold">스택을 선택해주세요.</div>
      <div className="select-box">
        
      </div>
    </Box>
  );
};

export default SelectStack;

const Box = styled.div`
  position: absolute;
  border: 1px solid black;
  border-radius: var(--radius-def);
  width: 50%;
  height: 75%;
  top: 10%;
  left: 25%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: var(--padding-1);
`;
