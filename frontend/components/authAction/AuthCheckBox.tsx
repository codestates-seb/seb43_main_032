import styled from 'styled-components';

const OptionBox = styled.div`
  display: flex;
  gap: 10px;
`;
const CheckBox = styled.input`
  accent-color: black;
  width: 20px;
  height: 20px;
`;
const P = styled.p.attrs({
  className: 'nanum-regular',
})`
  margin-bottom: 5px;
  flex-shrink: 0;
`;
export default function AuthCheckBox({
  name,
  ...rest
}: {
  [key: string]: any;
}) {
  return (
    <OptionBox>
      <CheckBox {...rest.register} type="checkbox" />
      <P>{name}</P>
    </OptionBox>
  );
}
