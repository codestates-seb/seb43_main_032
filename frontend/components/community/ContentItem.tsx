import React from 'react';
import styled from 'styled-components';
import Tag from '../Tag';
import Link from 'next/link';

type Example = {
  id: number;
  user: string;
  score: number;
  star: number;
  view: number;
  title: string;
  tags: string[];
  content: string;
};

export default function ContentItem(data: Example) {
  return (
    <Link
      href={`community/post/${data.id}`}
      onClick={() => console.log(data.id)}
    >
      <Container>
        <Left>
          <div>score: {data.score}</div>
          <div>view: {data.view}</div>
        </Left>
        <Center>
          <Top>
            <div className="title nanum-semi-bold">{data.title}</div>
            {data.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </Top>
          <div className="content">{data.content}</div>
        </Center>
        <Right>
          <div>{data.user}</div>
          <img src="ex.png"></img>
          <div>★ {data.star}</div>
        </Right>
      </Container>
    </Link>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  background-color: white;
  font-size: 15px;
  margin-bottom: 20px;
  padding: 10px 15px;
  border-radius: 20px;
  box-shadow: var(--shadow);
`;

const Left = styled.div`
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
  width: 75%;
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
