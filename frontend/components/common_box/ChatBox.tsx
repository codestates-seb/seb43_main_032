import { ReactNode } from 'react';
import styled from 'styled-components';
const ChatBox = ({ children }: { children: ReactNode }) => {
  return (
    <Box>
      <div className="top">쪽지함</div>
      <div className="bottom">
        <div className="sub-title">
          <span>받은 쪽지함</span>
        </div>
        <div className="content">{children}</div>
      </div>
    </Box>
  );
};

export default ChatBox;

const Box = styled.div`
  padding: 40px;
  .top {
    font-size: 22px;
    color: white;
  }
  .bottom {
    margin-top: 40px;
    color: white;
    .sub-title {
      font-size: 13px;
      margin-bottom: 11px;
      > span {
        padding: 10px 10px;
        border-radius: 10px 10px 0 0;
        color: #ffffff;
        background-color: #b87fe7;
      }
    }
  }
  .content {
    background-color: #ffffff;
    color: black;
  }
`;
