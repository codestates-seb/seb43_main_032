import { ReactNode, useState } from 'react';
import styled from 'styled-components';
import AuthInput from '../authAction/AuthInput';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
  padding-top: 10px;
  padding-bottom: 10px;
  ${({ lastItem }: { lastItem: Boolean }) =>
    lastItem
      ? 'padding-bottom: 0px'
      : 'border-bottom: 1px solid rgba(0, 0, 0, 0.3)'}
`;
const Leftbox = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;
const KeyContainer = styled.div`
  width: 100px;
`;
const ContentContainer = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: column;
  justify-content: flex-start;
`;
const Button = styled.button.attrs({
  className: 'noto-regular',
})`
  margin-left: 10px;
  padding: 10px;
  border: none;
  cursor: pointer;
  font-size: 20px;
  border-radius: 5px;
`;
const Input = styled.input`
  /* position: relative; */
  /* width: 100%; */
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
interface IProps {
  name: string;
  keyNode: ReactNode;
  contentNode: any;
  lastItem?: Boolean;
}
export default function InfoContainer({
  name,
  keyNode,
  contentNode,
  lastItem = false,
}: IProps) {
  const [isEdit, setIsEdit] = useState<Boolean>(false);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsEdit((prev) => !prev);
  };
  return (
    <Wrapper lastItem={lastItem}>
      <Leftbox>
        <KeyContainer className="nnum-bold">{keyNode}</KeyContainer>
        {name !== 'profile' && isEdit ? (
          <Input
            placeholder={contentNode ? contentNode : 'input..'}
            type={name}
          />
        ) : (
          <ContentContainer className="nnum-bold">
            {contentNode}
          </ContentContainer>
        )}
      </Leftbox>
      {isEdit ? (
        <div className="noto-regular">
          <Button data-name="Cancel" onClick={handleClick}>
            Cancel
          </Button>
          <Button data-name="Submit" onClick={handleClick}>
            Submit
          </Button>
        </div>
      ) : (
        <Button data-name="Edit" onClick={handleClick}>
          Edit
        </Button>
      )}
    </Wrapper>
  );
}
