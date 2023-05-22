import React, { useState } from 'react';
import styled from 'styled-components';
import Tag from '../Tag';
import { FaComment, FaEye, FaHeart, FaStar } from 'react-icons/fa';
import { FiHeart } from 'react-icons/fi';
import { Community } from '@/types/community';
import { useRouter } from 'next/router';

export default function ContentItem(article: Community) {
  const router = useRouter();
  const moveArticle = () => {
    router.push(`community/post/${article.articleId}`);
  };

  const [view, setView] = useState(false);
  const onClick = () => {
    setView((prev) => !prev);
  };

  return (
    <Container onClick={moveArticle}>
      <Left>
        <img src={article.memberInfo.profileImageUrl}></img>
        <div className="name-box">{article.memberInfo.name}</div>
        <div className="star-box">
          <FaStar color="#FF9900"></FaStar> {article.totalLikes}
        </div>
      </Left>
      <Center>
        <div className="title nanum-semi-bold">{article.title}</div>
        <div className="content">{article.content}</div>
        <div className="tagBox">
          {article.techList.map((tag, i) => (
            <Tag key={`${i}+${tag.tech}`}>{tag.tech}</Tag>
          ))}
        </div>
      </Center>
      <Right>
        <div className="heartBox">
          {view === true ? (
            <button onClick={() => onClick()}>
              <span>{article.totalLikes}</span>
              <FiHeart color="#909090" />
            </button>
          ) : (
            <button>
              <span>{article.totalLikes}</span>
              <FaHeart />
            </button>
          )}
        </div>
        <div>
          <button>
            <span>{article.view}</span>
            <FaEye color="#909090" />
          </button>
        </div>
        <div>
          <button>
            <span>{article.totalAnswers}</span>
            <FaComment color="#909090" />
          </button>
        </div>
      </Right>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 120px;
  gap: 8px;
  display: flex;
  justify-content: space-between;
  background-color: white;
  font-size: 15px;
  margin-bottom: 20px;
  padding: 10px 15px;
  border-radius: 10px;
  box-shadow: 6px 6px 15px #efefef, -6px -6px 15px #f5f5f5;
  position: relative;
  overflow: hidden;
  cursor: pointer;

  :hover {
    outline: 3px solid #ca66fc;
    transition: background 0.5s ease, color 0.5s ease;
  }

  > &:hover {
    transform: scale(1.2);
    border: 3px solid purple;
  }
  button {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 3px 3px;
    font-weight: 600;
    border: none;
    cursor: pointer;
    background: #fff;
    border: 1px solid #efefef;

    :hover {
      background: transparent;
      color: #9b7aff;
      border-radius: 5px;
      transition: background 0.5s ease, color 0.5s ease;
    }
  }
`;

const Center = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 0px;
  width: 75%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  > .tagBox {
    width: 100%;
    font-size: 12px;
    display: flex;
    gap: 8px;
    display: flex;
    height: 22px;
    flex-wrap: wrap;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  > .title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #414141;
    font-weight: 600;
  }

  > .content {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
    color: #545454;
  }
`;

const Left = styled.div`
  display: flex;
  width: 10%;
  min-width: 100px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  .name-box {
    font-size: 12px;
  }

  > div {
    vertical-align: baseline;
  }

  > img {
    width: 50px;
    height: 50px;
    object-fit: cover;
  }
`;

const Right = styled.div`
  display: flex;
  width: 15%;
  flex-direction: column;
  justify-content: start;
  align-items: end;

  button {
    min-width: 50px;
    display: flex;
    gap: 4px;
    justify-content: space-between;
    text-align: end;
    span {
      flex: 1;
    }
  }

  > div {
    text-align: right;
    padding: 5px;
    display: flex;
    align-items: center;
    span {
      font-size: 14px;
      font-weight: bold;
      color: #5b5b5b;
    }
  }
`;
