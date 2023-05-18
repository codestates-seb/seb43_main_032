import styled from 'styled-components';

export default function AuthInput({
  name,
  type,
  ...rest
}: {
  [key: string]: any;
}) {
  return (
    <>
      <TextBox>{name}</TextBox>
      <Input {...rest.register} type={type} />
    </>
  );
}

const Input = styled.input`
  position: relative;
  width: 100%;
  border: none;
  height: 40px;
  margin-bottom: 7px;
  border-radius: 10px;
  padding: 10px;
  outline: none;
  padding: 10px 20px;
  border-radius: 35px;
  font-size: 16px;
  letter-spacing: 1px;
  color: #fff;
  background: #dde1e7;
  box-shadow: inset 2px 2px 5px #babecc, inset -5px -5px 10px #ffffff73;

  &:hover {
    box-shadow: inset 2px 2px 5px #babecc, inset -5px -5px 10px #ffffff73;
  }
`;
const TextBox = styled.div.attrs({
  className: 'nanum-regular',
})`
  width: 100%;
  margin: 5px;
  margin-top: 20px;
`;
