import styled from 'styled-components';

const Input = styled.input`
  position: relative;
  width: 100%;
  border: none;
  height: 40px;
  margin-bottom: 7px;
  border-radius: 10px;
  padding: 10px;
  --tw-ring-inset: var(--tw-empty, /*!*/ /*!*/);
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgba(59, 130, 246, 0.5);
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0
    var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0
    calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow),
    var(--tw-shadow, 0 0 #0000);
  &:focus {
    outline: none;
    --tw-ring-color: rgba(141, 184, 252, 0.3);
    --tw-ring-shadow: var(--tw-ring-inset) 0 0 0
      calc(5px + var(--tw-ring-offset-width)) var(--tw-ring-color);
    box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow),
      var(--tw-shadow, 0 0 #0000);
  }
`;
const TextBox = styled.div.attrs({
  className: 'nanum-regular',
})`
  width: 100%;
  margin: 5px;
  margin-top: 20px;
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
