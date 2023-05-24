import React from 'react';
import styled from 'styled-components';

interface EditInputProps {
  [key: string]: any;
}

const EditInput: React.FC<EditInputProps> = ({
  type,
  label,
  placeholder,
  ...rest
}) => {
  return (
    <Wrapper>
      <Label>{label}</Label>
      <Input
        {...rest.register}
        type={type}
        placeholder={placeholder}
        style={{ height: label === 'About Me' ? '150px' : '' }}
      />
    </Wrapper>
  );
};

export default EditInput;

const Wrapper = styled.div`
  width: 100%;
`;

export const Input = styled.input`
  position: relative;
  resize: none;
  width: 100%;
  border: none;
  min-height: 20px;
  margin-bottom: 8px;
  border-radius: 10px;
  padding: 10px;
  font-family: 'Pretendard';
  border: solid 2px #ececec;
  --tw-ring-inset: var(--tw-empty, /*!*/ /*!*/);
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0
    var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0
    calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow),
    var(--tw-shadow, 0 0 #0000);
  transition: all 0.3s;
  &:focus {
    outline: none;
    --tw-ring-color: rgb(150, 116, 255, 0.5);
    --tw-ring-shadow: var(--tw-ring-inset) 0 0 0
      calc(5px + var(--tw-ring-offset-width)) var(--tw-ring-color);
    box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow),
      var(--tw-shadow, 0 0 #0000);
  }
`;
const Label = styled.p.attrs({ className: 'nanum-bold' })`
  padding: 10px 0;
  letter-spacing: 3px;
`;
