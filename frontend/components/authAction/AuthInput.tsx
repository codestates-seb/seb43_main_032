import styled from 'styled-components';

export default function AuthInput({
  name,
  type,
  placeholder,
  ...rest
}: {
  [key: string]: any;
}) {
  return (
    <>
      {name && <TextBox>{name}</TextBox>}
      <Input {...rest.register} type={type} placeholder={placeholder}></Input>
    </>
  );
}

const Input = styled.input`
  font-family: 'Pretendard';
  position: relative;
  width: 100%;
  border: none;
  height: 40px;
  margin-bottom: 7px;
  border-radius: 10px;
  padding: 10px;
  outline: none;
  padding: 10px 20px;
  border-radius: 10px;
  font-size: 15px;
  letter-spacing: 1px;
  color: #171717;
  background: rgba(255, 255, 255, 0.7);
  box-shadow: inset 2px 2px 5px #babecc, inset -5px -5px 10px #ffffff73;

  &:hover {
    box-shadow: inset 2px 2px 5px #babecc, inset -5px -5px 10px #ffffff73;
  }

  :focus {
    background: white;
  }

  ::placeholder {
    color: #898989;
    font-size: 12px;
  }
`;
const TextBox = styled.div.attrs({
  className: 'nanum-regular',
})`
  width: 100%;
  margin: 5px;
  margin-top: 20px;
  color: white;
  font-weight: 700;
  text-shadow: 2px 1px 3px #454545;
`;
