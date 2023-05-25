import SubBtn from '@/components/button/SubBtn';
import ChatBox from '@/components/common_box/ChatBox';
import { chatState } from '@/recoil/atom';
import { formatDate2 } from '@/util/date';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';

import styled from 'styled-components';
const ChatItem = () => {
  const router = useRouter();
  const { id } = router.query;
  const chat = useRecoilValue(chatState);
  const item = chat.find((data) => data.id === Number(id));
  const backEvent = () => {
    router.back();
  };
  return (
    <>
      <Head>{item && <title>{`Side Quest - ${item.title}`}</title>}</Head>
      <ChatBox>
        <Box>
          {item && (
            <>
              <div>
                <SubBtn onClick={backEvent}>뒤로가기</SubBtn>
              </div>
              <div>{formatDate2(new Date(item?.createdAt))}</div>
              <div className="item-title">{item?.title}</div>
              <div className="item-content">{item?.content}</div>
            </>
          )}
        </Box>
      </ChatBox>
    </>
  );
};

export default ChatItem;

const Box = styled.div`
  height: 60vh;
  padding: var(--padding-2);
  display: flex;
  flex-direction: column;
  gap: 20px;
  .item-title {
    font-size: 20px;
  }
  .item-content {
    font-size: 13px;
  }
`;
