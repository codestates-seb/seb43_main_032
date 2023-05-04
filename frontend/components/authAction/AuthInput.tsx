import styled from 'styled-components';
const Input = styled.input`
  width: 100%;
  border: none;
  height: 40px;
  margin-bottom: 20px;
  border-radius: 10px;
  padding: 10px;
`;
const TextBox = styled.div.attrs({
  className: 'nanum-regular',
})`
  width: 100%;
  margin: 5px;
`;
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
