import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div``;

const TextArea = styled.textarea`
  position: relative;
  resize: none;
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
const Label = styled.p.attrs({ className: 'nanum-bold' })`
  padding-top: 20px;
  padding-bottom: 10px;
`;

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
      <TextArea
        {...rest.register}
        type={type}
        placeholder={placeholder}
        style={{ height: label === 'About Me' ? '150px' : '' }}
      />
    </Wrapper>
  );
};

export default EditInput;
