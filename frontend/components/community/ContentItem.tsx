import React from 'react';
import styled from 'styled-components';
import Tag from '../Tag';
import Link from 'next/link';

type Example = {
  id: number;
  userEmail: string;
  userStar: number;
  avatar: string;
  category: string;
  title: string;
  content: string;
  createdAt: Date;
  modifiedAt: Date;
  star: number;
  viewCount: number;
  tags: string[];
};

export default function ContentItem(data: Example) {
  return (
    <Container>
      <Left>
        <div>star: {data.star}</div>
        <div>view: {data.viewCount}</div>
      </Left>
      <Link href={`community/post/${data.id}`}>
        <Center>
          <Top>
            <div className="title nanum-semi-bold">{data.title}</div>
            {data.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </Top>
          <div className="content">{data.content}</div>
        </Center>
      </Link>
      <Right>
        <div>{data.userEmail}</div>
        <img src="ex.png"></img>
        <div>★ {data.star}</div>
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
  font-size: 12px;

  > .title {
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 5px;
    margin-right: 20px;
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
