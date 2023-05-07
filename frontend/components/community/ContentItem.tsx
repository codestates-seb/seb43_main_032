import React from 'react';
import styled from 'styled-components';
import Tag from '../Tag';
import Link from 'next/link';
import { Example } from './ContentItemList';

// item 리스트의 개별 아이템들
export default function ContentItem(data: Example, idx: number) {
  return (
    <Container>
      <Left>
        <div>star: {data.STAR}</div>
        <div>view: {data.VIEW}</div>
      </Left>
      <Link href={`community/post/${data.ARTICLE_ID}`}>
        <Center>
          <Top>
            <div className="title nanum-semi-bold">{data.TITLE}</div>
            <div className="tagBox">
              {data.TAGS.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </Top>
          <div className="content">{data.CONTENT}</div>
        </Center>
      </Link>
      <Right>
        <div>{data.MEMBER_ID}</div>
        {/* memberID에서 이메일 받아와야함 or nickName */}
        <img src="ex.png"></img>
        <div>★ {data.STAR}</div>
      </Right>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: white;
  font-size: 15px;
  margin-bottom: 20px;
  padding: 10px 15px;
  border-radius: 20px;
  box-shadow: var(--shadow);

  > a {
    width: 65%;
  }
`;

const Left = styled.div`
  width: 15%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: end;

  > div {
    text-align: right;
    padding: 5px;
  }
`;

const Center = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 5px;
  padding-left: 20px;

  > .content {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 12px;

  > .title {
    color: var(--sub-font-dark-gray);
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 5px;
    margin-right: 20px;
  }

  > .tagBox {
    display: flex;
    gap: 8px;
    color: #767676;
  }
`;

const Right = styled.div`
  width: 15%;
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: center;

  > div {
    vertical-align: baseline;
  }

  > img {
    width: 40px;
    height: 40px;
    object-fit: cover;
  }
`;
