import styled from 'styled-components';

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

const OptionBox = styled.div`
  display: flex;
  gap: 10px;
`;
const CheckBox = styled.input`
  accent-color: black;
  width: 16px;
  height: 16px;
`;
const P = styled.p.attrs({
  className: 'nanum-regular',
})`
  margin-bottom: 5px;
  flex-shrink: 0;
`;
