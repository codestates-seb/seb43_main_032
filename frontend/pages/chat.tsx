import Pagenation from '@/components/Pagenation';
import { useState } from 'react';
import styled from 'styled-components';

const Chat = () => {
  const [page, setPage] = useState(1);

  return (
    <Box>
      <div className="top">쪽지함</div>
      <div className="bottom">
        <div className="sub-title">
          <span>받은 쪽지함</span>
        </div>
        <div className="content">
          <div>
            <ul className="chat-box">
              <li className="chat-item">
                <div>제목</div>
                <div>아이디</div>
              </li>
            </ul>
          </div>
          <div className="page-box">
            <Pagenation pageSize={1} page={page} onPageChange={setPage} />
          </div>
        </div>
      </div>
    </Box>
  );
};

export default Chat;

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

  .chat-box {
    height: 60vh;
    padding: var(--padding-2);
  }

  .chat-item {
    display: flex;
  }

  .page-box {
    padding: var(--padding-2);
  }
`;
