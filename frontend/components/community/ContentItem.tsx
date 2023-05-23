import React, { useState } from 'react';
import styled from 'styled-components';
import Tag from '../Tag';
import { FaComment, FaEye, FaHeart, FaStar } from 'react-icons/fa';
import { FiHeart, FiMessageSquare } from 'react-icons/fi';
import { Community } from '@/types/community';
import { useRouter } from 'next/router';
import { AiOutlineComment, AiOutlineEye } from 'react-icons/ai';

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
              <FiHeart color="rgb(130, 23, 243)" />
            </button>
          ) : (
            <button>
              <span>
                {article.totalLikes > 1000 ? '999+' : article.totalLikes}
              </span>
              <FaHeart color="rgb(130, 23, 243)" />
            </button>
          )}
        </div>
        <div>
          <button>
            <span>{article.view > 1000 ? '999+' : article.view}</span>
            <AiOutlineEye color="rgb(130, 23, 243)" />
          </button>
        </div>
        <div>
          <button>
            <span>
              {article.totalAnswers > 1000 ? '999+' : article.totalAnswers}
            </span>
            <FiMessageSquare color="rgb(130, 23, 243)" />
          </button>
        </div>
      </Right>
    </Container>
  );
}

const Container = styled.div`
  width: 90%;
  height: 120px;
  gap: 8px;
  display: flex;
  justify-content: space-around;
  background-color: white;
  font-size: 15px;
  padding: 10px 15px;
  border-radius: 10px;
  box-shadow: 6px 6px 15px #efefef, -6px -6px 15px #f5f5f5;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: all 2s ease-in-out;

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

const Left = styled.div`
  display: flex;
  width: 10%;
  min-width: 100px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  .star-box {
    border: solid 1px #ececec;
    padding: 2px 5px;
    border-radius: 5px;
  }

  .name-box {
    font-size: 12px;
  }

  > div {
    vertical-align: baseline;
  }

  > img {
    border: solid 1px #ececec;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    object-fit: cover;
  }
`;

const Center = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 0px;
  width: 70%;
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
    font-size: 11px;
    color: #545454;
  }
`;

const Right = styled.div`
  display: flex;
  width: 10%;
  flex-direction: column;
  justify-content: start;
  align-items: end;

  button {
    min-width: 60px;
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
